import { create } from 'zustand';

interface AuthState {
  name: string | null;
  token: string | null;
}
const useAuthStore = create<AuthState>((set) => ({
  name: '',
  token: null,
  set: (name: string, token: string) => set({ name, token }),
  reset: () => set({ name: '', token: null }),
}));

export default useAuthStore;
