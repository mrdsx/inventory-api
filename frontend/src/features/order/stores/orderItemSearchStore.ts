import { create } from "zustand";

type OrderItemSearchState = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useOrderItemSearchStore = create<OrderItemSearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
