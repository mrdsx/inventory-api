import { DataTable } from "@/components/ui";
import { getPaginatedOrders } from "@/features/order";
import { WorkspacePageContentLoader } from "@/features/workspace";
import { Suspense } from "react";
import { OrdersActions } from "./components/OrdersActions";
import { ordersTableColumns } from "./components/orders-table-columns";

export default async function OrdersPage() {
  const paginatedOrders = await getPaginatedOrders();

  return (
    <>
      <span className="text-2xl">Orders</span>
      <div className="flex flex-col gap-6">
        <OrdersActions />

        <Suspense fallback={<WorkspacePageContentLoader />}>
          <DataTable
            columns={ordersTableColumns}
            data={paginatedOrders.items}
          />
        </Suspense>
      </div>
    </>
  );
}
