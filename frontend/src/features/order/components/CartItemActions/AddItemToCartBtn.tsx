import { Button } from "@/components/ui";
import { Product } from "@/features/product";
import { useOrderCartStore } from "../../stores/orderCartStore";
import "./cart-action-btn.css";

export function AddItemToCartBtn({ item }: { item: Product }) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => addToCart(item)}
      className="mt-2 h-(--cart-action-btn-size) px-2 text-xs"
    >
      Add to Cart
    </Button>
  );
}
