import { Card } from "@/components/ui";
import {
  AddToCartBtn,
  DecrementItemCountBtn,
  IncrementItemCountBtn,
  useOrderCartStore,
} from "@/features/order";
import { Product, useProductGroupByStore } from "@/features/product";

// TODO: refactor
export function ProductRowsView({ items }: { items: Product[] }) {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const { getItemCount } = useOrderCartStore();

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const count = getItemCount(item.id);
        return (
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
                <span className="font-medium">Cost:</span>{" "}
                {item.cost.toFixed(2)}
              </div>
            </div>
            <div>
              {count <= 0 ? (
                <AddToCartBtn item={item} />
              ) : (
                <div className="flex items-center gap-1">
                  <DecrementItemCountBtn item={item} />
                  <span className="min-w-[20px] text-center">{count}</span>
                  <IncrementItemCountBtn item={item} />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
