"use client";

import { SearchInput } from "@/components";
import { useProductSearchStore } from "@/features/product";

export function SearchProductsInput() {
  const { searchQuery, setSearchQuery } = useProductSearchStore();

  return (
    <SearchInput
      placeholder="Search products..."
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
    />
  );
}
