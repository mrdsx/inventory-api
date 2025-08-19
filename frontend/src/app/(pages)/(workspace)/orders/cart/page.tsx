import { ROUTES } from "@/app/lib";
import { GoBackBtn } from "@/components";
import { Cart } from "./components/Cart";

export default function CartPage() {
  return (
    <div className="flex h-120 flex-col transition-colors">
      <div className="flex h-full flex-1 flex-col rounded-md">
        <GoBackBtn href={ROUTES.workspace.orders.create} />
        <h2 className="px-4 text-lg font-bold">Cart</h2>
        <Cart />
      </div>
    </div>
  );
}
