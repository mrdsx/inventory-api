import { ContentLoader } from "@/components";
import { TableBody, TableCell, TableRow } from "@/components/ui";
import {
  fetchRecentOrders,
  ORDERS_TABLE_COLUMNS,
  OrdersTable,
  OrdersTableRow,
} from "@/features/order";
import { Suspense } from "react";

export async function RecentOrdersSection() {
  const { items: orders } = await fetchRecentOrders();

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <OrdersTable className="h-60">
        <TableBody>
          <Suspense fallback={<TableBodyContentLoader />}>
            {orders.map((order) => (
              <OrdersTableRow order={order} key={order.id} />
            ))}
          </Suspense>
        </TableBody>
      </OrdersTable>
    </div>
  );
}

function TableBodyContentLoader() {
  return (
    <TableRow>
      <TableCell colSpan={ORDERS_TABLE_COLUMNS.length}>
        <ContentLoader />
      </TableCell>
    </TableRow>
  );
}
