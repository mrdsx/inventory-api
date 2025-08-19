import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { CartItem, useOrderCartStore } from "@/features/order";
import { Ellipsis } from "lucide-react";

export function CartItemDropdownMenu({ item }: { item: CartItem }) {
  const removeItem = useOrderCartStore((state) => state.removeItem);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-accent mx-3 rounded-sm p-1.5">
        <Ellipsis size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Cart item</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => removeItem(item.id)}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
