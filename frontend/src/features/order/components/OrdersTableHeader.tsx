import { TableHead, TableHeader, TableRow } from "@/components/ui";

export const TABLE_COLUMNS = [
  "ID",
  "Supplier",
  "Created at",
  "Status",
  "Total Cost",
] as const;

export function OrdersTableHeader() {
  return (
    <TableHeader className="sticky top-0">
      <TableRow className="table-header">
        {TABLE_COLUMNS.map((item, index) => (
          <TableHead
            className="p-2 text-start font-semibold"
            key={item + index}
          >
            {item}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
