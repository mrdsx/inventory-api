import { Card } from "@/components/ui";
import { CartItemActions } from "@/features/order";
import { Product, ProductInfo, useProductViewStore } from "@/features/product";
import { cn } from "@/lib/utils";

export function ProductsView({ products }: { products: Product[] }) {
  const productView = useProductViewStore((state) => state.productView);

  const divClassName =
    productView === "grid"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      : "grid-cols-1";
  const cardClassName =
    productView === "grid" ? "flex-col" : "flex-row items-center";

  return (
    <div className={cn("grid gap-2", divClassName)}>
      {products.map((product) => (
        <Card
          key={product.id}
          className={cn("flex justify-between p-3 text-[13px]", cardClassName)}
        >
          <ProductInfo product={product} />
          <CartItemActions item={product} />
        </Card>
      ))}
    </div>
  );
}
