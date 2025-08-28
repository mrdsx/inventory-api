"use client";

import { QUERY_KEYS, ROUTES, usePaginatedQueryParams } from "@/app/lib";
import { NavigationBtn, PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { getSuppliers } from "@/features/supplier";
import { useQuery } from "@tanstack/react-query";
import { SUPPLIERS_TABLE_COLUMNS } from "./suppliers-table-columns";

export default function SuppliersPage() {
  const { itemsPerPage, page } = usePaginatedQueryParams();

  const { data: paginatedSuppliers, isPending } = useQuery({
    queryKey: [QUERY_KEYS.SUPPLIERS, page, itemsPerPage],
    queryFn: () => getSuppliers(page, itemsPerPage),
    throwOnError: true,
    retry: false,
  });

  return (
    <>
      <PageHeading>Suppliers</PageHeading>
      <NavigationBtn href={ROUTES.workspace.suppliers.create}>
        Create Supplier
      </NavigationBtn>
      <DataTable
        className="h-90"
        columns={SUPPLIERS_TABLE_COLUMNS}
        isLoading={isPending}
        paginationData={paginatedSuppliers}
      />
    </>
  );
}
