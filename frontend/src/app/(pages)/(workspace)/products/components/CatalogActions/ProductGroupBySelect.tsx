"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ProductGroupBy, useProductGroupByStore } from "@/features/product";

export function ProductGroupBySelect() {
  const { groupBy, setGroupBy } = useProductGroupByStore();

  return (
    <Select
      value={groupBy}
      onValueChange={(val) => setGroupBy(val as ProductGroupBy)}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Group by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="category">Group by Categories</SelectItem>
        <SelectItem value="supplier">Group by Suppliers</SelectItem>
      </SelectContent>
    </Select>
  );
}
