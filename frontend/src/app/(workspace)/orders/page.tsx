import { OrdersActions } from "./components/OrdersActions";
import { OrdersSection } from "./components/OrdersSection";

export default function OrdersPage() {
  return (
    <>
      <span className="text-2xl">Orders</span>
      <div className="flex flex-col gap-6">
        <OrdersActions />
        <OrdersSection />
      </div>
    </>
  );
}
