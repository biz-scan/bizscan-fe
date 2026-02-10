import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { tokenStorage } from '@/lib/tokenStorage';
import type { User } from '@/types/auth.type';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Actions
  setUser: (user: User) => void;
  setStoreId: (storeId: number | null) => void;
  setAuth: (user: User, token: string, persist?: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      // Actions
      setUser: (user) => set({ user }),

      setStoreId: (id) =>
        set((state) => ({
          user: state.user ? { ...state.user, storeId: id } : null,
        })),

      setAuth: (user, token, persistToken = false) => {
        tokenStorage.set(token, persistToken);
        set({ user, isAuthenticated: true });
      },

      setInitialized: (initialized) => set({ isInitialized: initialized }),

      logout: () => {
        tokenStorage.remove();
        set({ user: null, isAuthenticated: false, storeId: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // user 정보만 persist (token은 tokenStorage에서 관리)
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
