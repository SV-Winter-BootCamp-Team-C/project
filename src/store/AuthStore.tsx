import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStoreProps {
  userId?: number;
  isLoggedIn: boolean;
  setUserId: (userId: number) => void;
  setLoginStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      userId: undefined,
      isLoggedIn: false,
      setUserId: (userId: number) => set({ userId }),
      setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
