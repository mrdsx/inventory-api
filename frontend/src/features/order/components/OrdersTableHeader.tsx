import { TableHead, TableHeader, TableRow } from "@/components/ui";

export const ORDERS_TABLE_COLUMNS = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
  },
  {
    accessorKey: "date",
    header: "Created at",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total_cost",
    header: "Total Cost",
  },
] as const;

export function OrdersTableHeader() {
  return (
    <TableHeader className="sticky top-0">
      <TableRow className="table-header">
        {ORDERS_TABLE_COLUMNS.map(({ header }, index) => (
          <TableHead
            className="p-2 text-start font-semibold"
            key={header + index}
          >
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
