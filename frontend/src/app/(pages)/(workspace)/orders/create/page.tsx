import { Accordion, ScrollArea } from "@/components/ui";
import { Catalog } from "./components/Catalog";
import { CatalogActions } from "./components/CatalogActions/CatalogActions";
import { CatalogContent } from "./components/CatalogContent/CatalogContent";
import { CreateOrderPageActions } from "./components/CreateOrderPageActions";

export default function CreateOrderPage() {
  return (
    <div>
      <CreateOrderPageActions />
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
