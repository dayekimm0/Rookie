import { create } from "zustand";

const useHeaderStore = create((set, get) => ({
  isHeaderFolded: false,
  setFolded: (value) => set({ isHeaderFolded: value }),
  foldIfScrolled: (scrollY) => {
    const { isScrollLocked } = get();
    if (isScrollLocked) return; // 🔒 잠긴 상태면 아무 동작도 하지 않음

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

  isManuallyClosed: false,
  setManuallyClosed: (value) => set({ isManuallyClosed: value }),
}));

export default useHeaderStore;
