import { apiClient, ENDPOINTS } from "@/app/lib";
import { Table, TableBody } from "@/components/ui";
import { OrderResponse, OrdersTableRow } from "@/features/order";
import { Suspense } from "react";
import { RecentOrdersTableBodySkeleton } from "./RecentOrdersTableBodySkeleton";
import { RecentOrdersTableHeader } from "./RecentOrdersTableHeader";

export async function RecentOrdersSection() {
  const orders = await apiClient<OrderResponse[]>(
    `${ENDPOINTS.orders}?limit=10&order_by_recent=true`,
  );

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <div className="max-h-60 overflow-y-auto">
        <Table className="w-full">
          <RecentOrdersTableHeader />
          <TableBody>
            <Suspense fallback={<RecentOrdersTableBodySkeleton />}>
              {orders.map((order) => (
                <OrdersTableRow order={order} key={order.id} />
              ))}
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
