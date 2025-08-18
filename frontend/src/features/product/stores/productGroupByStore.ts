import { create } from "zustand";

type ProductGroupByState = {
  groupBy: "category" | "supplier";
  setGroupBy: (value: "category" | "supplier") => void;
};

export const useProductGroupByStore = create<ProductGroupByState>((set) => ({
  groupBy: "category",
  setGroupBy: (value: "category" | "supplier") => set({ groupBy: value }),
}));
