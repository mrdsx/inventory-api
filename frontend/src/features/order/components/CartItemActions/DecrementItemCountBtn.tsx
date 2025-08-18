import { Button } from "@/components/ui";
import { Product } from "@/features/product";
import { Minus } from "lucide-react";
import { useOrderCartStore } from "../../stores/orderCartStore";
import "./cart-action-btn.css";

export function DecrementItemCountBtn({ item }: { item: Product }) {
  const decrementItemCount = useOrderCartStore(
    (state) => state.decrementItemCount,
  );

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => decrementItemCount(item.id)}
      className="size-(--cart-action-btn-size)"
    >
      <Minus size={14} />
    </Button>
  );
}
