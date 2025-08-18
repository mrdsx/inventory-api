import { Card } from "@/components/ui";
import { CartItemActions } from "@/features/order";
import { Product, useProductGroupByStore } from "@/features/product";

// TODO: refactor
export function ProductRowsView({ items }: { items: Product[] }) {
  const groupBy = useProductGroupByStore((state) => state.groupBy);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex flex-row items-center justify-between p-3 text-[13px]"
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
