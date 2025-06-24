import { create } from "zustand";

export const useVideoStore = create((set) => ({
  isNoVideo: false,
  setNoVideo: (value) =>
    set({
      isNoVideo: value,
    }),
}));
