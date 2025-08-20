import { Button } from "@/components/ui";
import { Product, useFavoriteProductsStore } from "@/features/product";
import { useThemeStore } from "@/features/theme";
import { Heart } from "lucide-react";

export function ToggleFavoriteProductBtn({ item }: { item: Product }) {
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
  );
}
