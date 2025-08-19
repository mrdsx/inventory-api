import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export function CreateOrderPageActions() {
  return (
    <div className="flex justify-between">
      <NavigationBtn
        className="mb-2"
        href={ROUTES.workspace.orders.root}
        variant="link"
      >
        <ArrowLeft />
        Go back
      </NavigationBtn>
      <NavigationBtn
        className="mr-4"
        href={ROUTES.workspace.orders.cart}
        variant="ghost"
      >
        <ShoppingCart />
      </NavigationBtn>
    </div>
  );
}
