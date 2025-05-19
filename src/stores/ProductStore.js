import { create } from "zustand";

const useProductStore = create((set) => ({
  selectCollabo: "ALL",
  setSelectCollabo: (value) => set({ selectCollabo: value }),

  selectedBrand: "",
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  sort: "newest",
  setSort: (value) => set({ sort: value }),

  // 추가: 선택한 상품 ID
  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }),
}));

export default useProductStore;
