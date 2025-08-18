import { Button } from "@/components/ui";
import { Product } from "@/features/product";
import { Minus } from "lucide-react";
import { useOrderCartStore } from "../stores/orderCartStore";

export function DecrementItemCountBtn({ item }: { item: Product }) {
  const decrementItemCount = useOrderCartStore(
    (state) => state.decrementItemCount,
  );

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => decrementItemCount(item.id)}
      className="h-7.5 w-7.5"
    >
      <Minus size={14} />
    </Button>
  );
}
