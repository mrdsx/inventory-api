import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { CartItemActions, useOrderCartStore } from "@/features/order";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Ellipsis } from "lucide-react";

export function CartItemsList() {
  const cart = useOrderCartStore((state) => state.cart);
  const removeItem = useOrderCartStore((state) => state.removeItem);

  return (
    <ScrollArea className="mb-4 h-80 flex-1 px-4">
      <ul className="divide-y-1">
        {cart.map((item) => (
          <li key={item.id}>
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
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
