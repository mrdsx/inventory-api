import { Accordion, ScrollArea } from "@/components/ui";
import { CatalogActions } from "./CatalogActions/CatalogActions";
import { CatalogContent } from "./CatalogContent/CatalogContent";

export function Catalog() {
  return (
    <div className="flex w-full flex-col gap-4">
      <CatalogActions />
      <ScrollArea className="h-95">
        <Accordion type="multiple">
          <CatalogContent />
        </Accordion>
      </ScrollArea>
    </div>
  );
}
