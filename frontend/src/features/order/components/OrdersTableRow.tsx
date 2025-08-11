import { TableCell, TableRow } from "@/components/ui";
import { ORDER_STATUS, OrderResponse } from "@/features/order";

export function OrdersTableRow({ order }: { order: OrderResponse }) {
  const orderStatusStyles =
    order.status === ORDER_STATUS.DELIVERED
      ? "text-green-500"
      : order.status === ORDER_STATUS.CANCELED
        ? "text-red-500"
        : "text-blue-500";

  return (
    <TableRow>
      <TableCell className="p-2 text-start font-normal">{order.id}</TableCell>
      <TableCell className="text-start font-normal">
        {order.supplier_name}
      </TableCell>
      <TableCell className="text-start font-normal">{order.date}</TableCell>
      <TableCell className="text-start font-normal">
        <span className={`rounded-full px-3 py-1 ${orderStatusStyles}`}>
          {order.status}
        </span>
      </TableCell>
      <TableCell className="text-start font-normal">
        {order.total_cost}
      </TableCell>
    </TableRow>
  );
}
