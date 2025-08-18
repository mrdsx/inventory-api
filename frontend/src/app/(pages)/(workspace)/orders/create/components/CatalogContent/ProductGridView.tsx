import { Card } from "@/components/ui";
import { CartItemActions } from "@/features/order";
import { Product, ProductInfo } from "@/features/product";

export function ProductGridView({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col justify-between p-3 text-[13px]"
        >
          <ProductInfo product={item} />
          <CartItemActions item={item} />
        </Card>
      ))}
    </div>
  );
}
