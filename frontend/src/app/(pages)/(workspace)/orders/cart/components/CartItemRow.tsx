import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { CartItem, CartItemActions, useOrderCartStore } from "@/features/order";
import { Ellipsis } from "lucide-react";

export function CartItemRow({ item }: { item: CartItem }) {
  const removeItem = useOrderCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center px-2 py-4">
      <span className="mr-4 w-[30%]">{item.name}</span>
      <CartItemActions item={item} />
      <span className="ml-auto font-semibold text-gray-600 dark:text-gray-300">
        ${(item.cost * item.count).toFixed(2)}
      </span>
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
    </div>
  );
}
