import { Button } from "@/components/ui";
import { Product } from "@/features/product";
import { useOrderCartStore } from "../stores/orderCartStore";

// TODO: replace hardcoded values
export function AddToCartBtn({ item }: { item: Product }) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => addToCart(item)}
      className="mt-2 h-7.5 px-2 text-xs"
    >
      Add to Cart
    </Button>
  );
}
