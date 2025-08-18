import { create } from "zustand";
import { ProductGroupBy } from "../types";

type ProductGroupByState = {
  groupBy: ProductGroupBy;
  setGroupBy: (value: ProductGroupBy) => void;
};

export const useProductGroupByStore = create<ProductGroupByState>((set) => ({
  groupBy: "category",
  setGroupBy: (value: ProductGroupBy) => set({ groupBy: value }),
}));
