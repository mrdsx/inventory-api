import { useProductGroupByStore } from "../stores";
import { Product } from "../types";

export function ProductInfo({ product }: { product: Product }) {
  const groupBy = useProductGroupByStore((state) => state.groupBy);

  return (
    <div>
      <ProductName>{product.name}</ProductName>
      {groupBy === "category" ? (
        <ProductField title="Supplier" value={product.category} />
      ) : (
        <ProductField title="Category" value={product.category} />
      )}
      <ProductField title="Cost" value={product.cost} />
    </div>
  );
}

function ProductName({ children }: { children: React.ReactNode }) {
  return <div className="text-base font-bold">{children}</div>;
}

function ProductField({ title, value }: { title: string; value: any }) {
  return (
    <div className="mt-1 text-gray-600 dark:text-gray-300">
      {title}: {value}
    </div>
  );
}
