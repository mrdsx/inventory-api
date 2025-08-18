import { Button } from "@/components/ui";
import { Product } from "@/features/product";
import { Plus } from "lucide-react";
import { useOrderCartStore } from "../../stores/orderCartStore";
import "./cart-action-btn.css";

export function IncrementItemCountBtn({ item }: { item: Product }) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => addToCart(item)}
      className="size-(--cart-action-btn-size)"
    >
      <Plus size={14} />
    </Button>
  );
}
