import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useToggleStore = create(
  persist(
    (set) => ({
      isTeamMode: false,
      setTeamMode: (val) => set({ isTeamMode: val }),
    }),
    {
      name: "toggle-mode",
      onRehydrateStorage: () => (state) => {
        const { user } = authStore.getState();
        if (!user) {
          // 유저 없으면 초기화
          state?.setTeamMode(false);
        }
      },
    }
  )
);

export const useSearchStore = create((set) => ({
  searchOpen: false,
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  closeSearch: () => set({ searchOpen: false }),
  setSearchOpen: (val) => set({ searchOpen: val }),
}));
