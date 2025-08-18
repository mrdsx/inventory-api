import { Card } from "@/components/ui";
import { CartItemActions } from "@/features/order";
import {
  Product,
  ProductInfo,
  ProductView,
  useProductViewStore,
} from "@/features/product";
import { cn } from "@/lib/utils";

export function ProductsView({ products }: { products: Product[] }) {
  const productView = useProductViewStore((state) => state.productView);
  const { cardClassName, layoutClassName } = getProductViewStyles(productView);

  return (
    <div className={cn("grid gap-2", layoutClassName)}>
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

function getProductViewStyles(productView: ProductView) {
  const layoutClassName =
    productView === "grid"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-1";
  const cardClassName =
    productView === "grid" ? "flex-col" : "flex-row items-center";

  return { layoutClassName, cardClassName };
}
