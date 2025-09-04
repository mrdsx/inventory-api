"use client";

import { QUERY_KEYS, usePaginatedQueryParams } from "@/app/lib";
import { PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { fetchInventoryItems } from "@/features/inventory";
import { useQuery } from "@tanstack/react-query";
import { INVENTORY_ITEMS_TABLE_COLUMNS } from "./inventory-items-table-columns";

const { INVENTORY_ITEMS } = QUERY_KEYS;

export default function InventoryPage() {
  const { itemsPerPage, page } = usePaginatedQueryParams();
  const { data: paginatedInventoryItems, isPending } = useQuery({
    queryKey: [INVENTORY_ITEMS, page, itemsPerPage],
    queryFn: () => fetchInventoryItems(page, itemsPerPage),
  });

  return (
    <>
      <PageHeading>Inventory</PageHeading>
      <div>
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
