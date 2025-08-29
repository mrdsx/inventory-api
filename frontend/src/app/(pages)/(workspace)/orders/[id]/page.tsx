import { ROUTES } from "@/app/lib";
import { GoBackBtn, PageHeading } from "@/components";
import { Button } from "@/components/ui";
import { fetchOrderById } from "@/features/order";
import { Suspense } from "react";
import { OrderInfo } from "./components/OrderInfo";
import { OrderInfoSkeleton } from "./components/OrderInfoSkeleton";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const order = await fetchOrderById(id);

  return (
    <>
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <div className="space-y-2">
        <Suspense fallback={<OrderInfoSkeleton />}>
          <PageHeading>Order #{id}</PageHeading>
          <OrderInfo order={order} />
          <Button>View items</Button>
        </Suspense>
      </div>
    </>
  );
}
