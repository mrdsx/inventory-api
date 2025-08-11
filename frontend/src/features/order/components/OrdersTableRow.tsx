import { TableCell, TableRow } from "@/components/ui";
import { ORDER_STATUS, OrderResponse } from "@/features/order";

export function OrdersTableRow({ order }: { order: OrderResponse }) {
  const orderStatusStyles =
    order.status === ORDER_STATUS.DELIVERED
      ? "text-green-800 bg-green-300/50 dark:bg-green-300/80"
      : order.status === ORDER_STATUS.CANCELED
        ? "text-red-800 bg-red-300/50 dark:bg-red-300/80"
        : "text-blue-800 bg-blue-300/50 dark:bg-blue-300/80";

  return (
    <TableRow>
      <TableCell className="px-2 py-3 text-start font-normal">
        {order.id}
      </TableCell>
      <TableCell className="w-[20%] text-start font-normal">
        {order.supplier_name}
      </TableCell>
      <TableCell className="text-start font-normal">{order.date}</TableCell>
      <TableCell className="text-start font-normal">
        <span className={`rounded-md px-3 py-1 ${orderStatusStyles}`}>
          {order.status}
        </span>
      </TableCell>
      <TableCell className="text-start font-normal">
        {order.total_cost}
      </TableCell>
    </TableRow>
  );
}
