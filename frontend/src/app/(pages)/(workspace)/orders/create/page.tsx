import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { Accordion, ScrollArea } from "@/components/ui";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Catalog } from "./components/Catalog";
import { CatalogActions } from "./components/CatalogActions/CatalogActions";
import { CatalogContent } from "./components/CatalogContent/CatalogContent";

export default function CreateOrderPage() {
  return (
    <div>
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
      <Catalog>
        <CatalogActions />
        <ScrollArea className="h-95">
          <Accordion type="multiple">
            <CatalogContent />
          </Accordion>
        </ScrollArea>
      </Catalog>
    </div>
  );
}
