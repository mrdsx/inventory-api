import { TableCell, TableRow } from "@/components/ui";
import { OrderResponse } from "@/features/order";
import { getOrderStatusTableCellStyles } from "../utils/orderStatusUtils";

export function OrdersTableRow({ order }: { order: OrderResponse }) {
  const orderStatusStyles = getOrderStatusTableCellStyles(order.status);

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
