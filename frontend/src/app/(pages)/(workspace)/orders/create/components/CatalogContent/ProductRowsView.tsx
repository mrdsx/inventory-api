import { Button, Card } from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product, useProductGroupByStore } from "@/features/product";
import { Minus, Plus } from "lucide-react";

export function ProductRowsView({ items }: { items: Product[] }) {
  const groupBy = useProductGroupByStore((state) => state.groupBy);
  const { addToCart, getCartItemCount, removeOneFromCart } =
    useOrderCartStore();

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const count = getCartItemCount(item.id);
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToCart(item)}
                  className="h-7.5 px-2 text-xs"
                >
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => removeOneFromCart(item.id)}
                    className="h-7.5 w-7.5"
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="min-w-[20px] text-center">{count}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => addToCart(item)}
                    className="h-7.5 w-7.5"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
