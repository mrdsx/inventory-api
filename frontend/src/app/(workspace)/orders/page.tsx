import { apiClient } from "@/app/lib";
import { ScrollArea, Table, TableBody } from "@/components/ui";
import {
  OrderResponse,
  OrdersTableHeader,
  OrdersTableRow,
} from "@/features/order";
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
          <ScrollArea className="h-100 rounded-md border-1">
            <Table>
              <OrdersTableHeader />
              <TableBody>
                {orders.map((order) => (
                  <OrdersTableRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Suspense>
      </div>
    </>
  );
}
