import { apiClient } from "@/app/lib/api/client";
import { ENDPOINTS } from "@/app/lib/api/constants";
import { OrderResponse, OrderRow } from "@/features/order";
import { RecentOrdersTHead } from "./RecentOrdersTHead";

export async function RecentOrdersSection() {
  const orders = await apiClient<OrderResponse[]>(
    `${ENDPOINTS.orders}?limit=10&order_by_recent=true`,
  );

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <RecentOrdersTHead />
          <tbody>
            {orders.map((order) => (
              <OrderRow order={order} key={order.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
