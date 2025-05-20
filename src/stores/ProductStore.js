import { create } from "zustand";

const useProductStore = create((set) => ({
  selectCollabo: "ALL",
  setSelectCollabo: (value) => set({ selectCollabo: value }),

  selectedBrand: "",
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  sort: "newest",
  setSort: (value) => set({ sort: value }),

  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }),

  // ✅ 여기가 추가된 부분
  selectedCategory: "ALL",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useProductStore;
