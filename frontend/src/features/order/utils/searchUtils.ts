import { OrderItemResponse } from "../types";

export function getIsOrderItemInSearchQuery(
  orderItem: OrderItemResponse,
  searchQuery: string,
): boolean {
  const query = searchQuery.toLowerCase().trim();

  const { name, description, category } = orderItem;
  return (
    name.toLowerCase().includes(query) ||
    description.toLowerCase().includes(query) ||
    category.toLowerCase().includes(query)
  );
}
