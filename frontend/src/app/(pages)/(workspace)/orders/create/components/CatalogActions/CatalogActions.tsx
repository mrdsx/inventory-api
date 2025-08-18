import { ProductGroupBySelect } from "./ProductGroupBySelect";
import { ProductViewSelect } from "./ProductViewSelect";
import { SearchProductsBar } from "./SearchProductsBar";

export function CatalogActions() {
  return (
    <div className="flex flex-col gap-2">
      <SearchProductsBar />
      <div className="flex items-center gap-2">
        <ProductGroupBySelect />
        <ProductViewSelect />
      </div>
    </div>
  );
}
