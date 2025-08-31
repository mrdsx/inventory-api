"use client";

import {
  getIsOrderItemInSearchQuery,
  OrderItemResponse,
  useOrderItemSearchStore,
} from "@/features/order";
import { OrderItem } from "./OrderItem";

export function OrderItemsList({
  orderItems,
}: {
  orderItems: OrderItemResponse[];
}) {
  const searchQuery = useOrderItemSearchStore((state) => state.searchQuery);

  return (
    <ul className="grid gap-2">
      {orderItems.map((item) => {
        const inSearchQuery = getIsOrderItemInSearchQuery(item, searchQuery);

        return (
          inSearchQuery && (
            <li key={item.id}>
              <OrderItem item={item} />
            </li>
          )
        );
      })}
    </ul>
  );
}
