import { PageHeading } from "@/components";
import { DataTable } from "@/components/ui";
import { getSuppliers } from "@/features/supplier";
import { SUPPLIERS_TABLE_COLUMNS } from "./suppliers-table-columns";

export default async function SuppliersPage() {
  const paginatedSuppliers = await getSuppliers();

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
