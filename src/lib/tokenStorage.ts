const TOKEN_KEY = 'biz_scan_accessToken';
const STORAGE_TYPE_KEY = 'biz_scan_auth_storage_type';

type StorageType = 'local' | 'session';

function getStorage(type: StorageType): Storage {
  return type === 'local' ? localStorage : sessionStorage;
}

function getStorageType(): StorageType {
  return (localStorage.getItem(STORAGE_TYPE_KEY) as StorageType) || 'session';
}

export const tokenStorage = {
  /**
   * 토큰 저장
   * @param token - access token
   * @param persist - true: localStorage (로그인 유지), false: sessionStorage
   */
  set(token: string, persist: boolean = false) {
    const storageType: StorageType = persist ? 'local' : 'session';
    const storage = getStorage(storageType);

    // 이전 토큰 정리
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);

    // 새 토큰 저장
    storage.setItem(TOKEN_KEY, token);
    localStorage.setItem(STORAGE_TYPE_KEY, storageType);
  },

  /**
   * 토큰 조회
   */
  get(): string | null {
    const storageType = getStorageType();
    const storage = getStorage(storageType);
    return storage.getItem(TOKEN_KEY);
  },

  /**
   * 토큰 삭제 (로그아웃 시)
   */
  remove() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_TYPE_KEY);
  },

  /**
   * 로그인 유지 여부 확인
   */
  isPersisted(): boolean {
    return getStorageType() === 'local';
  },
};
