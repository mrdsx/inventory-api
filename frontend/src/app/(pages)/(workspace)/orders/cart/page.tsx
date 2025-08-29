import { GoBackBtn, PageHeading } from "@/components";
import { Cart } from "./components/Cart";

export default function CartPage() {
  return (
    <>
      <GoBackBtn />
      <div className="space-y-2">
        <PageHeading>Cart</PageHeading>
        <Cart />
      </div>
    </>
  );
}
