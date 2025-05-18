import { create } from "zustand";

const useProductStore = create((set) => ({
  selectCollabo: "ALL",
  setSelectCollabo: (value) => set({ selectCollabo: value }),

  selectedBrand: "",
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  sort: "newest",
  setSort: (value) => set({ sort: value }),
}));

export default useProductStore;
