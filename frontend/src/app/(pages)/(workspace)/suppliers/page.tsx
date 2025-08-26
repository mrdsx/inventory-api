"use client";

import { ROUTES } from "@/app/lib";
import { NavigationBtn, PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { useGetSuppliersQuery } from "@/features/supplier";
import { SUPPLIERS_TABLE_COLUMNS } from "./suppliers-table-columns";

export default function SuppliersPage() {
  const { data: paginatedSuppliers, isPending } = useGetSuppliersQuery();

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
