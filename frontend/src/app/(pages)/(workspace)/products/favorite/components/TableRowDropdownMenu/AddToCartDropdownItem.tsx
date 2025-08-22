import { DropdownMenuItem } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";

type AddToCartDropdownItemProps = {
  product: Product;
  disabled: boolean;
};

export function AddToCartDropdownItem({
  product,
  disabled,
}: AddToCartDropdownItemProps) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <DropdownMenuItem onClick={() => addToCart(product)} disabled={disabled}>
      Add to cart
    </DropdownMenuItem>
  );
}
