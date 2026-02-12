import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { tokenStorage } from '@/lib/tokenStorage';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 갱신 상태 관리
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러가 아니거나, 이미 재시도한 요청이면 그냥 에러 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 토큰이 없으면 리프레시할 수 없으므로 그대로 에러 반환
    if (!tokenStorage.get()) {
      return Promise.reject(error);
    }

    // 인증이 필요 없는 엔드포인트는 리프레시 시도하지 않음
    const skipRefreshUrls = ['/tokens/login', '/tokens/reissue', '/members/register'];
    if (skipRefreshUrls.some((url) => originalRequest.url?.includes(url))) {
      if (originalRequest.url?.includes('/tokens/reissue')) {
        tokenStorage.remove();
        window.location.href = '/auth';
      }
      return Promise.reject(error);
    }

    // 이미 refresh 중이면 큐에 추가
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // refresh 토큰으로 새 access 토큰 발급
      const response = await axiosInstance.post('/api/tokens/reissue');
      const accessToken = response.headers['authorization']?.replace('Bearer ', '');

      tokenStorage.set(accessToken, tokenStorage.isPersisted());
      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      tokenStorage.remove();
      window.location.href = '/auth';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
