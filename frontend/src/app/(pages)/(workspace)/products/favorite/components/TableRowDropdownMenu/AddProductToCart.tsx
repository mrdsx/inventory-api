import { DropdownMenuItem } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";

type AddProductToCartProps = {
  product: Product;
  disabled: boolean;
};

export function AddProductToCart({ product, disabled }: AddProductToCartProps) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <DropdownMenuItem onClick={() => addToCart(product)} disabled={disabled}>
      Add to cart
    </DropdownMenuItem>
  );
}
