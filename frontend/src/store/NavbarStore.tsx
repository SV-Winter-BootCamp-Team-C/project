import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface NavbarStoreProps {
  activeItem: string;
  handleItem: (newActiveItem: string) => void;
}

export const useNavbarStore = create<NavbarStoreProps>()(
  persist(
    (set) => ({
      activeItem: 'all',
      handleItem: (newActiveItem: string) => set(() => ({ activeItem: newActiveItem })),
    }),
    {
      name: 'navbar-item',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
