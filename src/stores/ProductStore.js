import { create } from "zustand";

const useProductStore = create((set) => ({
  sort: "random",
  setSort: (sort) => set({ sort }),

  initialShuffleDone: false,
  setInitialShuffleDone: () => set({ initialShuffleDone: true }),

  shuffledProducts: [],
  setShuffledProducts: (products) => set({ shuffledProducts: products }),

  // 콜라보 필터
  selectCollabo: "ALL",
  setSelectCollabo: (value) => set({ selectCollabo: value }),

  selectedBrand: "",
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }),

  // 카테고리 선택
  selectedCategory: "ALL",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useProductStore;
