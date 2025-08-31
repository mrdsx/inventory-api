import { GoBackBtn, PageHeading } from "@/components";
import { Button, ScrollArea } from "@/components/ui";
import { CartItemsList } from "./components/CartItemsList";
import { CartTotalCost } from "./components/CartTotalCost";

export default function CartPage() {
  return (
    <>
      <GoBackBtn />
      <div className="space-y-2">
        <PageHeading>Cart</PageHeading>
        <ScrollArea className="mt-2 mb-4 h-80">
          <CartItemsList />
        </ScrollArea>
        <div className="flex items-center justify-between px-4">
          <Button className="text-md font-semibold">Check Out</Button>
          <CartTotalCost />
        </div>
      </div>
    </>
  );
}
