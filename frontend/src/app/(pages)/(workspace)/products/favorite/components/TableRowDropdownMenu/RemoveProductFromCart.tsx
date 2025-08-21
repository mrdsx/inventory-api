import { DropdownMenuItem } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";

export function RemoveProductFromCart({ product }: { product: Product }) {
  const removeItem = useOrderCartStore((state) => state.removeItem);

  return (
    <DropdownMenuItem onClick={() => removeItem(product.id)}>
      Remove from to cart
    </DropdownMenuItem>
  );
}
