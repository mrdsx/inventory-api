import { Button } from "@/components/ui";
import { Product, useFavoriteProductsStore } from "@/features/product";
import { Heart } from "lucide-react";

export function ToggleFavoriteProductBtn({ item }: { item: Product }) {
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
    <Button
      className="ml-auto size-(--cart-action-btn-size) hover:text-red-500"
      variant="outline"
      onClick={handleClick}
    >
      <Heart className={isProductFavorite ? "fill-red-500 text-red-500" : ""} />
    </Button>
  );
}
