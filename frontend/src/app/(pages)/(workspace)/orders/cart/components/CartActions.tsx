"use client";

import { handleAPIFetch } from "@/app/lib";
import { Button } from "@/components/ui";
import { Order, postOrder, useOrderCartStore } from "@/features/order";
import { toast } from "sonner";

export function CartActions() {
  const cart = useOrderCartStore((state) => state.cart);
  const clearCart = useOrderCartStore((state) => state.clearCart);
  if (cart.length === 0) return;

  const totalCost = cart.reduce(
    (total, item) => total + item.cost * item.quantity,
    0,
  );

  async function handleClick() {
    await handleAPIFetch<void>(async () => {
      const order: Order = { items: [...cart] };
      const response = await postOrder(order);
      clearCart();
      toast.success(response.message);
    });
  }

  return (
    <div className="flex items-center justify-between px-4">
      <Button className="text-md font-semibold" onClick={handleClick}>
        Check Out
      </Button>
      <span className="text-base font-semibold">
        Total: ${totalCost.toFixed(2)}
      </span>
    </div>
  );
}
