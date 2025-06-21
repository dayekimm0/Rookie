import { create } from "zustand";

const useHeaderStore = create((set, get) => ({
  isHeaderFolded: false,
  setFolded: (value) => set({ isHeaderFolded: value }),
  foldIfScrolled: (scrollY) => {
    const { isScrollLocked } = get();

    if (isScrollLocked && scrollY <= 2) return;
    if (isScrollLocked) return;

    set({ isHeaderFolded: scrollY > 50 });
  },
  unfold: () => set({ isHeaderFolded: false }),

  disableTransition: true,
  enableTransition: () => set({ disableTransition: false }),
  resetTransition: () => set({ disableTransition: true }),

  headerHeight: 177,
  setHeaderHeight: (value) => set({ headerHeight: value }),

  isScrollLocked: false,
  setScrollLocked: (value) => set({ isScrollLocked: value }),
}));

export default useHeaderStore;
