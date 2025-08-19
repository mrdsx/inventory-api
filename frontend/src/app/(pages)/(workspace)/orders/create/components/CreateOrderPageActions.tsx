import { ROUTES } from "@/app/lib";
import { GoBackBtn, NavigationBtn } from "@/components";
import { ShoppingCart } from "lucide-react";

export function CreateOrderPageActions() {
  return (
    <div className="flex justify-between">
      <GoBackBtn href={ROUTES.workspace.orders.root} />
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
