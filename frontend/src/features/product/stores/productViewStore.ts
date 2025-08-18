import { create } from "zustand";

type ProductViewState = {
  productView: "grid" | "rows";
  setProductView: (value: "grid" | "rows") => void;
};

export const useProductViewStore = create<ProductViewState>((set) => ({
  productView: "grid",
  setProductView: (value: "grid" | "rows") => set({ productView: value }),
}));
