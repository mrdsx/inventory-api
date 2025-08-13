import { TableBody } from "@/components/ui";
import { getRecentOrders, OrdersTable, OrdersTableRow } from "@/features/order";

export async function RecentOrdersSection() {
  const { items: orders } = await getRecentOrders();

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <OrdersTable className="h-60">
        <TableBody>
          {orders.map((order) => (
            <OrdersTableRow order={order} key={order.id} />
          ))}
        </TableBody>
      </OrdersTable>
    </div>
  );
}
