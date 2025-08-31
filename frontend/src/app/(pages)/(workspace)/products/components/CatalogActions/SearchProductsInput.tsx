"use client";

import { SearchInput } from "@/components";
import { useProductSearchStore } from "@/features/product";

export function SearchProductsInput() {
  const setSearchQuery = useProductSearchStore((state) => state.setSearchQuery);

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <SearchInput placeholder="Search products..." onSearch={handleSearch} />
  );
}
