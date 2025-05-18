import { create } from "zustand";

const useHeaderStore = create((set) => ({
  isHeaderFolded: false,
  setFolded: (value) => set({ isHeaderFolded: value }),
  foldIfScrolled: (scrollY) => set({ isHeaderFolded: scrollY > 50 }),
  unfold: () => set({ isHeaderFolded: false }),
}));

export default useHeaderStore;
