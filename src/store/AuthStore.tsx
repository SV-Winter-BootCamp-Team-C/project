import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStoreProps {
  userId: number | null;
  isLoggedIn: boolean;
  setUserId: (userId: number | null) => void;
  setLoginStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      setUserId: (userId: number | null) => set({ userId }),
      setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
