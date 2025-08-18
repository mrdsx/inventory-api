import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { Accordion, ScrollArea } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { Catalog } from "./components/Catalog";
import { CatalogActions } from "./components/CatalogActions/CatalogActions";
import { CatalogContent } from "./components/CatalogContent/CatalogContent";

export default function CreateOrderPage() {
  return (
    <div>
      <NavigationBtn className="mb-2" href={ROUTES.workspace.orders.root}>
        <ArrowLeft />
        Go back
      </NavigationBtn>
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
