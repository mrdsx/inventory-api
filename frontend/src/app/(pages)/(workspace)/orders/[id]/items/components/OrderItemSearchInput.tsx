"use client";

import { SearchInput } from "@/components";
import { useOrderItemSearchStore } from "@/features/order";

export function OrderItemSearchInput() {
  const setSearchQuery = useOrderItemSearchStore(
    (state) => state.setSearchQuery,
  );

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <SearchInput placeholder="Search order items..." onSearch={handleSearch} />
  );
}
