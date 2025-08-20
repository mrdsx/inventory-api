import { create } from "zustand";

type FavoriteProductsState = {
  favoriteProducts: Set<number>;
  addFavoriteProductId: (id: number) => void;
  removeFavoriteProductId: (id: number) => void;
};

export const useFavoriteProductsStore = create<FavoriteProductsState>(
  (set, get) => ({
    favoriteProducts: new Set<number>(),
    addFavoriteProductId: (id: number) =>
      set((state) => ({
        favoriteProducts: new Set(state.favoriteProducts).add(id),
      })),
    removeFavoriteProductId: (id: number) => {
      const nextFavoriteProductIds = get().favoriteProducts;
      nextFavoriteProductIds.delete(id);
      set({ favoriteProducts: nextFavoriteProductIds });
    },
  }),
);
