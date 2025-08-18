import { Card } from "@/components/ui";
import { CartItemActions } from "@/features/order";
import { Product, useProductGroupByStore } from "@/features/product";

export function ProductGridView({ items }: { items: Product[] }) {
  const groupBy = useProductGroupByStore((state) => state.groupBy);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col justify-between p-3 text-[13px]"
        >
          <div>
            <div className="text-base font-bold">{item.name}</div>
            {groupBy === "category" ? (
              <div className="mt-1 text-gray-600 dark:text-gray-300">
                <span className="font-medium">Supplier:</span> {item.supplier}
              </div>
            ) : (
              <div className="mt-1 text-gray-600 dark:text-gray-300">
                <span className="font-medium">Category:</span> {item.category}
              </div>
            )}
            <div className="mt-1 text-gray-600 dark:text-gray-300">
              <span className="font-medium">Cost:</span> {item.cost.toFixed(2)}
            </div>
          </div>
          <CartItemActions item={item} />
        </Card>
      ))}
    </div>
  );
}
