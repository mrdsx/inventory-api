"use client";

import { PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { useGetSuppliersQuery } from "@/features/supplier";
import { SUPPLIERS_TABLE_COLUMNS } from "./suppliers-table-columns";

export default function SuppliersPage() {
  const { data: paginatedSuppliers } = useGetSuppliersQuery();

  return (
    <>
      <PageHeading>Suppliers</PageHeading>
      <DataTable
        className="h-100"
        columns={SUPPLIERS_TABLE_COLUMNS}
        paginationData={paginatedSuppliers}
      />
    </>
  );
}
