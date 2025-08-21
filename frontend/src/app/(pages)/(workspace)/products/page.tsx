import { Accordion, ScrollArea } from "@/components/ui";
import { CatalogActions } from "./components/CatalogActions/CatalogActions";
import { CatalogContent } from "./components/CatalogContent/CatalogContent";

export default function ProductsCatalogPage() {
  return (
    <>
      <h2 className="text-2xl">Products</h2>
      <div className="flex h-100 gap-4 transition-colors">
        <div className="flex w-full flex-col gap-4">
          <CatalogActions />
          <ScrollArea className="h-95">
            <Accordion type="multiple">
              <CatalogContent />
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
