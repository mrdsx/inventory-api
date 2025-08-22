import { DropdownMenuItem } from "@/components/ui";
import { Product, useFavoriteProductsStore } from "@/features/product";

export function UnfavoriteDropdownItem({ product }: { product: Product }) {
  const removeFavoriteProductId = useFavoriteProductsStore(
    (state) => state.removeFavoriteProductId,
  );

  return (
    <DropdownMenuItem
      onClick={() => removeFavoriteProductId(product.id)}
      variant="destructive"
    >
      Unfavorite
    </DropdownMenuItem>
  );
}
