import { Button } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product, useFavoriteProductsStore } from "@/features/product";
import { useThemeStore } from "@/features/theme";
import { Heart } from "lucide-react";
import { AddItemToCartBtn } from "./AddItemToCartBtn";
import { DecrementItemCountBtn } from "./DecrementItemCountBtn";
import { IncrementItemCountBtn } from "./IncrementItemCountBtn";
import "./cart-action-btn.css";

const MIN_COUNT_OF_CART_ITEM = 1;

export function CartItemActions({ item }: { item: Product }) {
  const count = useOrderCartStore((state) => state.getItemCount(item.id));
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { favoriteProducts, addFavoriteProductId, removeFavoriteProductId } =
    useFavoriteProductsStore();

  const isProductFavorite = favoriteProducts.has(item.id);

  function handleClick() {
    if (isProductFavorite) {
      removeFavoriteProductId(item.id);
    } else {
      addFavoriteProductId(item.id);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {count < MIN_COUNT_OF_CART_ITEM ? (
        <AddItemToCartBtn item={item} />
      ) : (
        <>
          <DecrementItemCountBtn item={item} />
          <span className="min-w-6 text-center">{count}</span>
          <IncrementItemCountBtn item={item} />
        </>
      )}
      <Button
        className="ml-auto size-(--cart-action-btn-size)"
        variant="outline"
        onClick={handleClick}
      >
        <Heart
          className={
            isProductFavorite ? (isDarkMode ? "fill-white" : "fill-black") : ""
          }
        />
      </Button>
    </div>
  );
}
