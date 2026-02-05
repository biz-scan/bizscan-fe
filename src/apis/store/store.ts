import axiosInstance from '@/apis/axiosInstance';
import type {
  GetStoreResponse,
  RegisterStoreRequest,
  RegisterStoreResponse,
  UpdateStoreRequest,
  UpdateStoreResponse,
} from '@/types/store.type';

/**
 * 매장 등록
 */
export async function registerStore(data: RegisterStoreRequest): Promise<RegisterStoreResponse> {
  const res = await axiosInstance.post<RegisterStoreResponse>('/api/stores', null, {
    params: data,
  });
  return res.data;
}

/**
 * 매장 조회
 */
export async function getStore(storeId: number): Promise<GetStoreResponse> {
  const res = await axiosInstance.get<GetStoreResponse>(`/api/stores/${storeId}`);
  return res.data;
}

/**
 * 매장 정보 부분 수정
 */
export async function updateStore(
  storeId: number,
  data: UpdateStoreRequest
): Promise<UpdateStoreResponse> {
  const res = await axiosInstance.patch<UpdateStoreResponse>(`/api/stores/${storeId}`, data);
  return res.data;
}
