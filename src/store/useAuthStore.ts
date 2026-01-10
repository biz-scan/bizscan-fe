import { create } from 'zustand';

interface AuthState {
  name: string | null;
  token: string | null;
  setAuth: (name: string, token: string) => void;
  resetAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  name: null,
  token: null,
  setAuth: (name, token) => set({ name, token }),
  resetAuth: () => set({ name: null, token: null }),
}));

export default useAuthStore;
