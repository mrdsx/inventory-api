import { Card } from "@/components/ui";
import { CartItemActions } from "@/features/order";
import { Product, ProductInfo } from "@/features/product";

export function ProductRowsView({ items }: { items: Product[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex flex-row items-center justify-between p-3 text-[13px]"
        >
          <ProductInfo product={item} />
          <CartItemActions item={item} />
        </Card>
      ))}
    </div>
  );
}
