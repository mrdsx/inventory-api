import { TableHead, TableHeader, TableRow } from "@/components/ui";

const TABLE_COLUMNS = [
  "ID",
  "Supplier Name",
  "Created at",
  "Status",
  "Total Cost",
] as const;

export function OrdersTableHeader() {
  return (
    <TableHeader className="sticky top-0">
      <TableRow className="bg-gray-100 hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800">
        {TABLE_COLUMNS.map((item, index) => (
          <TableHead
            className="sticky top-0 p-2 text-start font-semibold"
            key={item + index}
          >
            {item}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
