import { create } from "zustand";

const useHeaderStore = create((set) => ({
  isHeaderFolded: false,
  setFolded: (value) => set({ isHeaderFolded: value }),
  foldIfScrolled: (scrollY) => set({ isHeaderFolded: scrollY > 50 }),
  unfold: () => set({ isHeaderFolded: false }),

  disableTransition: true,
  enableTransition: () => set({ disableTransition: false }),
  resetTransition: () => set({ disableTransition: true }),

  headerHeight: 177,
  setHeaderHeight: (value) => set({ headerHeight: value }),
}));

export default useHeaderStore;
