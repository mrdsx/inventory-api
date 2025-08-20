import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";
import { AddItemToCartBtn } from "./AddItemToCartBtn";
import "./cart-action-btn.css";
import { DecrementItemCountBtn } from "./DecrementItemCountBtn";
import { IncrementItemCountBtn } from "./IncrementItemCountBtn";
import { ToggleFavoriteProductBtn } from "./ToggleFavoriteProductBtn";

const MIN_COUNT_OF_CART_ITEM = 1;

export function CartItemActions({ item }: { item: Product }) {
  const count = useOrderCartStore((state) => state.getItemCount(item.id));

  return (
    <div className="flex items-center gap-1">
      {count < MIN_COUNT_OF_CART_ITEM ? (
        <AddItemToCartBtn item={item} />
      ) : (
        <>
          <DecrementItemCountBtn item={item} />
          <span className="min-w-6 text-center">{count}</span>
          <IncrementItemCountBtn item={item} />
        </>
      )}
      <ToggleFavoriteProductBtn item={item} />
    </div>
  );
}
