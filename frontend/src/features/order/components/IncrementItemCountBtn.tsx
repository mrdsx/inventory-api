import { Button } from "@/components/ui";
import { Product } from "@/features/product";
import { Plus } from "lucide-react";
import { useOrderCartStore } from "../stores/orderCartStore";

export function IncrementItemCountBtn({ item }: { item: Product }) {
  const addToCart = useOrderCartStore((state) => state.addToCart);

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => addToCart(item)}
      className="h-7.5 w-7.5"
    >
      <Plus size={14} />
    </Button>
  );
}
