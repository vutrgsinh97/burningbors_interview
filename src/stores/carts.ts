import { create } from "zustand";
import { MyMiddlewares } from "./storeMiddlewares";

type TCartStore = {
  carts: TCart[] | null;
  updateAllCarts: (newCarts: TCart[] | null) => void;
  removeAllCart: () => void;
  getTotalProduct: () => number;
  getTotalCarts: () => number;
  getTotalPrice: () => number;
  getTotalProductQuantity: () => number;
  getTotalPriceDiscount: () => number;
  _hasHydrated: boolean;
  setHasHydrated: (hasRehydrated: boolean) => void;
};

export const useCartStore = create<TCartStore>()(
  MyMiddlewares(
    (set, get) => ({
      carts: null,
      _hasHydrated: false,
      updateAllCarts: (newCarts) =>
        set((state) => ({ ...state, carts: newCarts })),
      removeAllCart: () => set((state) => ({ ...state, carts: null })),
      getTotalProduct: () => {
        const carts = get()?.carts;
        if (!carts) return 0;
        return carts?.reduce((prev, curr) => (prev += curr.products.length), 0);
      },
      getTotalProductQuantity: () => {
        const carts = get()?.carts;
        if (!carts) return 0;
        return carts?.reduce((prev, curr) => (prev += curr.totalQuantity), 0);
      },
      getTotalCarts: () => get().carts?.length || 0,
      getTotalPrice: () => {
        const carts = get()?.carts;
        if (!carts) return 0;
        return carts?.reduce((prev, curr) => (prev += curr.total), 0);
      },
      getTotalPriceDiscount: () => {
        const carts = get()?.carts;
        if (!carts) return 0;
        return carts?.reduce((prev, curr) => (prev += curr.discountedTotal), 0);
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "carts",
      onRehydrateStorage(state) {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
