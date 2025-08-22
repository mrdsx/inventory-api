import { DropdownMenuItem } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";

export function AddProductToCart({
  product,
  disabled,
}: {
  product: Product;
  disabled: boolean;
}) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <DropdownMenuItem onClick={() => addToCart(product)} disabled={disabled}>
      Add to cart
    </DropdownMenuItem>
  );
}
