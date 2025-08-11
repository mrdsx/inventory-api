import { apiClient, ENDPOINTS } from "@/app/lib";
import { OrderResponse, OrderRow } from "@/features/order";
import { Suspense } from "react";
import { RecentOrdersTableBodySkeleton } from "./RecentOrdersTableBodySkeleton";
import { RecentOrdersTableHead } from "./RecentOrdersTableHead";

export async function RecentOrdersSection() {
  const orders = await apiClient<OrderResponse[]>(
    `${ENDPOINTS.orders}?limit=10&order_by_recent=true`,
  );

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <RecentOrdersTableHead />
          <tbody>
            <Suspense fallback={<RecentOrdersTableBodySkeleton />}>
              {orders.map((order) => (
                <OrderRow order={order} key={order.id} />
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}
