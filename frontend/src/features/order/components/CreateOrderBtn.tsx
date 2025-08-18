"use client";

import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";

export function CreateOrderBtn() {
  return (
    <NavigationBtn
      href={ROUTES.workspace.orders.create}
      className="bg-primary hover:bg-primary/80 px-3 font-semibold"
    >
      Create Order
    </NavigationBtn>
  );
}
