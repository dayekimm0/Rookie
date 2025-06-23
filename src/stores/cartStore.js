import { create } from "zustand";
import { persist } from "zustand/middleware";

// 옵션 비교 함수 (배열 기준)
const isSameOption = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      // 옵션 포함 중복 검사 + 추가
      addToCart: (product) =>
        set((state) => {
          const exists = state.cartItems.find(
            (item) =>
              item.id === product.id &&
              isSameOption(item.option, product.option)
          );

          if (exists) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id &&
                isSameOption(item.option, product.option)
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, checked: false }],
            };
          }
        }),

      // 옵션 포함 제거
      removeFromCart: (id, option = []) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === id && isSameOption(item.option, option))
          ),
        })),

      // 전체 제거
      clearCart: () => set({ cartItems: [] }),

      // 체크 상태 토글 (옵션 포함)
      toggleCheckItem: (id, option = []) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && isSameOption(item.option, option)
              ? { ...item, checked: !item.checked }
              : item
          ),
        })),

      // 강제 덮어쓰기 (예: 서버 동기화 등)
      setCartItems: (items) => set({ cartItems: items }),
    }),
    {
      name: "cart-storage", // localStorage 키
    }
  )
);

export default useCartStore;
