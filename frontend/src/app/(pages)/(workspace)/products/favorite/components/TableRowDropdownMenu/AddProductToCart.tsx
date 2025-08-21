import { DropdownMenuItem } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";

export function AddProductToCart({ product }: { product: Product }) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <DropdownMenuItem onClick={() => addToCart(product)}>
      Add to cart
    </DropdownMenuItem>
  );
}
