import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { CartItem, useOrderCartStore } from "@/features/order";
import { Ellipsis, Trash2 } from "lucide-react";

export function CartItemDropdownMenu({ item }: { item: CartItem }) {
  const removeItem = useOrderCartStore((state) => state.removeItem);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-accent mx-3 rounded-sm p-1.5">
        <Ellipsis size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
