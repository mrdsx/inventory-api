import { create } from "zustand";
import { ProductView } from "../types";

type ProductViewState = {
  productView: ProductView;
  setProductView: (value: ProductView) => void;
};

export const useProductViewStore = create<ProductViewState>((set) => ({
  productView: "grid",
  setProductView: (value: ProductView) => set({ productView: value }),
}));
