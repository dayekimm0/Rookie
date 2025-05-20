import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) =>
        set((state) => {
          const exists = state.cartItems.find((item) => item.id === product.id);
          if (exists) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, product] };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // localStorage key 이름
    }
  )
);

export default useCartStore;
