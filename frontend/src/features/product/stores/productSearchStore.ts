import { create } from "zustand";

type ProductSearchState = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const useProductSearchStore = create<ProductSearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (value: string) => set({ searchQuery: value }),
}));
