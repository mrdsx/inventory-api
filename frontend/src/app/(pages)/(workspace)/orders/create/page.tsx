"use client";

import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { ArrowLeft } from "lucide-react";
import { Catalog } from "./components/Catalog";

export default function CreateOrderPage() {
  return (
    <div>
      <NavigationBtn className="mb-2" href={ROUTES.workspace.orders.root}>
        <ArrowLeft />
        Go back
      </NavigationBtn>
      <div className="flex h-100 gap-4 transition-colors">
        <Catalog />
      </div>
    </div>
  );
}
