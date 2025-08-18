import { SearchBar } from "@/components";
import { useProductSearchStore } from "@/features/product";
import { ProductGroupBySelect } from "./ProductGroupBySelect";
import { ProductViewSelect } from "./ProductViewSelect";

export function CatalogActions() {
  const { searchQuery, setSearchQuery } = useProductSearchStore();

  return (
    <div className="mb-4 flex flex-col gap-2">
      <SearchBar
        placeholder="Search products..."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <div className="flex items-center gap-2">
        <ProductGroupBySelect />
        <ProductViewSelect />
      </div>
    </div>
  );
}
