import { TableCell, TableRow } from "@/components/ui";
import { OrderResponse } from "@/features/order";
import { cn } from "@/lib/utils";
import { getOrderStatusClassName } from "../utils/orderStatusUtils";

export function OrdersTableRow({ order }: { order: OrderResponse }) {
  const orderStatusClassName = getOrderStatusClassName(order.status);

  return (
    <TableRow>
      <TableCell className="w-[20%] text-start font-normal">
        {order.supplier_name}
      </TableCell>
      <TableCell className="text-start font-normal">{order.date}</TableCell>
      <TableCell className="text-start font-normal">
        <span className={cn("rounded-md px-3 py-1", orderStatusClassName)}>
          {order.status}
        </span>
      </TableCell>
      <TableCell className="text-start font-normal">
        {order.total_cost}
      </TableCell>
    </TableRow>
  );
}
