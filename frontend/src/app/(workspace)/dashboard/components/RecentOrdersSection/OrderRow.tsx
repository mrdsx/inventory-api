import { OrderResponse } from "@/features/order";

export function OrderRow({ order }: { order: OrderResponse }) {
  return (
    <tr>
      <th className="p-2 text-start font-normal">Order #{order.id}</th>
      <th className="text-start font-normal">{order.supplier_name}</th>
      <th className="text-start font-normal">{order.date}</th>
      <th className="text-start font-normal">{order.status}</th>
      <th className="text-start font-normal">{order.total_cost}</th>
    </tr>
  );
}
