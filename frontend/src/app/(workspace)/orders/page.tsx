import { apiClient } from "@/app/lib";
import { TableBody } from "@/components/ui";
import { OrderResponse, OrdersTable, OrdersTableRow } from "@/features/order";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { Suspense } from "react";
import { OrdersActions } from "./components/OrdersActions";

export default async function OrdersPage() {
  const orders = await apiClient<OrderResponse[]>("/orders");

  return (
    <>
      <span className="text-2xl">Orders</span>
      <div className="flex flex-col gap-6">
        <OrdersActions />

        <Suspense fallback={<WorkspacePageContentLoader />}>
          <OrdersTable>
            <TableBody>
              {orders.map((order) => (
                <OrdersTableRow order={order} key={order.id} />
              ))}
            </TableBody>
          </OrdersTable>
        </Suspense>
      </div>
    </>
  );
}
