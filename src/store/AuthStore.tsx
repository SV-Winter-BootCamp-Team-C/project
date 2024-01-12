import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStoreProps {
  isLoggedIn: boolean;
  setLoginStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
    }),
    {
      name: 'isLoggedIn',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
