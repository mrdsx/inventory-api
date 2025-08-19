import { useProductGroupByStore } from "../stores";
import { Product } from "../types";

type ProductFieldProps = {
  title: string;
  value: string | number;
};

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

function ProductField({ title, value }: ProductFieldProps) {
  return (
    <div className="mt-1 text-gray-600 dark:text-gray-300">
      {title}: {value}
    </div>
  );
}
