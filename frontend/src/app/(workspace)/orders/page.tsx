import { apiClient } from "@/app/lib";
import { Button, Input, Table, TableBody } from "@/components/ui";
import { OrderResponse, OrdersTableRow } from "@/features/order";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { Suspense } from "react";
import { RecentOrdersTableHeader } from "../dashboard/components/RecentOrdersSection/RecentOrdersTableHeader";

export default async function OrdersPage() {
  const orders = await apiClient<OrderResponse[]>("/orders");

  return (
    <>
      <span className="text-2xl">Orders</span>
      <div>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="ring-border w-[50vw] sm:w-1/2">
            <Input placeholder="Search orders" />
          </div>
          <Button className="bg-primary hover:bg-primary/80 px-3 py-1 font-semibold text-white">
            Create Order
          </Button>
        </div>

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
