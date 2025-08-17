import { CreateOrderBtn } from "@/features/order";

export function OrdersActions() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row">
      <CreateOrderBtn />
    </div>
  );
}
