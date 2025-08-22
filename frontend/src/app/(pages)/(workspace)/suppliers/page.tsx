import { apiClient, PaginatedResponse } from "@/app/lib";
import { PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { SupplierResponse } from "@/features/supplier";
import { SUPPLIERS_TABLE_COLUMNS } from "./suppliers-table-columns";

export default async function SuppliersPage() {
  const paginatedSuppliers =
    await apiClient<PaginatedResponse<SupplierResponse[]>>("/suppliers");

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
