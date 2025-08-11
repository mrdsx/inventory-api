import { ORDER_STATUS, OrderResponse } from "@/features/order";

export function OrderRow({ order }: { order: OrderResponse }) {
  const orderStatusStyles =
    order.status === ORDER_STATUS.DELIVERED
      ? "bg-green-500"
      : order.status === ORDER_STATUS.CANCELED
        ? "bg-red-500"
        : "bg-blue-500";

  return (
    <tr>
      <th className="p-2 text-start font-normal">Order #{order.id}</th>
      <th className="text-start font-normal">{order.supplier_name}</th>
      <th className="text-start font-normal">{order.date}</th>
      <th className="text-start font-normal">
        <span className={`rounded-full px-3 py-1 ${orderStatusStyles}`}>
          {order.status}
        </span>
      </th>
      <th className="text-start font-normal">{order.total_cost}</th>
    </tr>
  );
}
