import { Card } from "@/components/ui";
import {
  AddToCartBtn,
  DecrementItemCountBtn,
  IncrementItemCountBtn,
  useOrderCartStore,
} from "@/features/order";
import { Product, useProductGroupByStore } from "@/features/product";

export function ProductGridView({ items }: { items: Product[] }) {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const { getItemCount } = useOrderCartStore();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => {
        const count = getItemCount(item.id);

        return (
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
                <span className="font-medium">Cost:</span>{" "}
                {item.cost.toFixed(2)}
              </div>
            </div>
            {count <= 0 ? (
              <AddToCartBtn item={item} />
            ) : (
              <div className="mt-2 flex items-center gap-1">
                <DecrementItemCountBtn item={item} />
                <span className="min-w-[20px] text-center">{count}</span>
                <IncrementItemCountBtn item={item} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
