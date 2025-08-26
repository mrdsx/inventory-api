"use client";

import { PageHeading } from "@/components";
import { Button, DataTable } from "@/components/ui";
import { useGetSuppliersQuery } from "@/features/supplier";
import { SUPPLIERS_TABLE_COLUMNS } from "./suppliers-table-columns";

export default function SuppliersPage() {
  const { data: paginatedSuppliers, isPending } = useGetSuppliersQuery();

  return (
    <>
      <PageHeading>Suppliers</PageHeading>
      <Button>Create Supplier</Button>
      <DataTable
        className="h-90"
        columns={SUPPLIERS_TABLE_COLUMNS}
        isLoading={isPending}
        paginationData={paginatedSuppliers}
      />
    </>
  );
}
