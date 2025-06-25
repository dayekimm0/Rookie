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

export const getFoldState = (
  scrollY,
  isFolded,
  isScrollLocked,
  isManuallyClosed
) => {
  if (isManuallyClosed) return "manual"; // 수동으로 닫은 경우
  if (isFolded || (isScrollLocked && scrollY > 2)) return "auto"; // 자동 접힘
  return "open"; // 열려 있는 상태
};
