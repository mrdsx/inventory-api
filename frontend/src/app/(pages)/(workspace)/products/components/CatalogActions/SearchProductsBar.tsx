"use client";

import { SearchBar } from "@/components";
import { useProductSearchStore } from "@/features/product";

export function SearchProductsBar() {
  const { searchQuery, setSearchQuery } = useProductSearchStore();

  return (
    <SearchBar
      placeholder="Search products..."
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
    />
  );
}
