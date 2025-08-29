import { GoBackBtn, PageHeading } from "@/components";
import { Cart } from "./components/Cart";

export default function CartPage() {
  return (
    <div className="flex h-120 flex-col transition-colors">
      <div className="flex h-full flex-col rounded-md">
        <GoBackBtn className="mb-2" />
        <PageHeading>Cart</PageHeading>
        <Cart />
      </div>
    </div>
  );
}
