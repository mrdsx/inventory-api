import { OrderCartBtn } from "@/features/order";
import { FavoriteProductsBtn } from "@/features/product";
import { ProductGroupBySelect } from "./ProductGroupBySelect";
import { ProductViewSelect } from "./ProductViewSelect";
import { SearchProductsBar } from "./SearchProductsBar";

export function CatalogActions() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <ProductGroupBySelect />
          <ProductViewSelect />
        </div>
        <div className="flex items-center gap-2">
          <FavoriteProductsBtn />
          <OrderCartBtn />
        </div>
      </div>
      <SearchProductsBar />
    </div>
  );
}
