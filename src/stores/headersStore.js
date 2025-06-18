import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useToggleStore = create(
  persist(
    (set) => ({
      isTeamMode: false,
      setTeamMode: (val) => set({ isTeamMode: val }),
    }),
    {
      name: "toggle-mode", // localStorage 키 이름
    }
  )
);

export const useSearchStore = create((set) => ({
  searchOpen: false,
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  closeSearch: () => set({ searchOpen: false }),
  setSearchOpen: (val) => set({ searchOpen: val }),
}));
