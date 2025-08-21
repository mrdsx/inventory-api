import { PageHeading } from "@/components";
import { OrderCartBtn } from "@/features/order";
import { OrdersSection } from "./components/OrdersSection";

export default function OrdersPage() {
  return (
    <>
      <PageHeading>Orders</PageHeading>
      <div className="flex flex-col gap-2">
        <OrderCartBtn />
        <OrdersSection />
      </div>
    </>
  );
}
