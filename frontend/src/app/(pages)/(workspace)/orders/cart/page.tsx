import { GoBackBtn, PageHeading } from "@/components";
import { ScrollArea } from "@/components/ui";
import { CartActions } from "./components/CartActions";
import { CartItemsList } from "./components/CartItemsList";

export default function CartPage() {
  return (
    <>
      <GoBackBtn />
      <div className="space-y-2">
        <PageHeading>Cart</PageHeading>
        <ScrollArea className="mt-2 mb-4 h-80">
          <CartItemsList />
        </ScrollArea>
        <CartActions />
      </div>
    </>
  );
}
