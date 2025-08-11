import { apiClient, ENDPOINTS } from "@/app/lib";
import { ScrollArea, Table, TableBody } from "@/components/ui";
import {
  OrderResponse,
  OrdersTableHeader,
  OrdersTableRow,
} from "@/features/order";

export async function RecentOrdersSection() {
  const orders = await apiClient<OrderResponse[]>(
    `${ENDPOINTS.orders}?limit=10&order_by_recent=true`,
  );

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <ScrollArea className="h-60 rounded-sm border">
        <Table>
          <OrdersTableHeader />
          <TableBody>
            {orders.map((order) => (
              <OrdersTableRow order={order} key={order.id} />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
