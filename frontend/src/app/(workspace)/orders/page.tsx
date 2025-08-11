import { apiClient } from "@/app/lib";
import { Table, TableBody } from "@/components/ui";
import { OrderResponse, OrdersTableRow } from "@/features/order";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { Suspense } from "react";
import { RecentOrdersTableHeader } from "../dashboard/components/RecentOrdersSection/RecentOrdersTableHeader";
import { OrdersActions } from "./components/OrdersActions";

export default async function OrdersPage() {
  const orders = await apiClient<OrderResponse[]>("/orders");

  return (
    <>
      <span className="text-2xl">Orders</span>
      <div className="flex flex-col gap-6">
        <OrdersActions />

        <Suspense fallback={<WorkspacePageContentLoader />}>
          <div className="max-h-100 overflow-auto rounded-md border-1">
            <Table>
              <RecentOrdersTableHeader />
              <TableBody>
                {orders.map((order) => (
                  <OrdersTableRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </div>
        </Suspense>
      </div>
    </>
  );
}
