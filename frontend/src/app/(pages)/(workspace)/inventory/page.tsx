"use client";

import { QUERY_KEYS, usePaginatedQueryParams } from "@/app/lib";
import { PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { fetchInventoryItems } from "@/features/inventory";
import { useQuery } from "@tanstack/react-query";
import { INVENTORY_ITEMS_TABLE_COLUMNS } from "./inventory-items-table-columns";

export default function InventoryPage() {
  const { itemsPerPage, page } = usePaginatedQueryParams();
  const { data: paginatedInventoryItems, isPending } = useQuery({
    queryKey: [QUERY_KEYS.INVENTORY_ITEMS, page, itemsPerPage],
    queryFn: () => fetchInventoryItems(page, itemsPerPage),
  });

  return (
    <>
      <PageHeading>Inventory</PageHeading>
      <div className="w-250">
        <DataTable
          className="h-[60vh]"
          columns={INVENTORY_ITEMS_TABLE_COLUMNS}
          isLoading={isPending}
          paginationData={paginatedInventoryItems}
        />
      </div>
    </>
  );
}
