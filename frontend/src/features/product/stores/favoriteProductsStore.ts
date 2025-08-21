import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

type FavoriteProductsState = {
  favoriteProducts: Set<number>;
  addFavoriteProductId: (id: number) => void;
  removeFavoriteProductId: (id: number) => void;
};

export const useFavoriteProductsStore = create<FavoriteProductsState>()(
  persist(
    (set, get) => ({
      favoriteProducts: new Set<number>(),
      addFavoriteProductId: (id: number) =>
        set((state) => ({
          favoriteProducts: new Set(state.favoriteProducts).add(id),
        })),
      removeFavoriteProductId: (id: number) => {
        const nextFavoriteProductIds = new Set(get().favoriteProducts);
        nextFavoriteProductIds.delete(id);
        set({ favoriteProducts: nextFavoriteProductIds });
      },
    }),
    {
      name: "favorite-products-store",
      storage: {
        getItem: (name) => {
          const storedValue = localStorage.getItem(name);
          if (storedValue === null) return null;

          const parsed: StorageValue<FavoriteProductsState> =
            JSON.parse(storedValue);
          if (typeof parsed.state.favoriteProducts === "object") {
            parsed.state.favoriteProducts = new Set(
              parsed.state.favoriteProducts,
            );
          }
          return parsed;
        },
        setItem: (name, value) => {
          const serializableValue = { ...value };
          if (serializableValue.state.favoriteProducts instanceof Set) {
            // @ts-ignore
            serializableValue.state.favoriteProducts = Array.from(
              serializableValue.state.favoriteProducts,
            );
          }
          localStorage.setItem(name, JSON.stringify(serializableValue));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
