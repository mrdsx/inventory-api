import { TableHead, TableHeader, TableRow } from "@/components/ui";

const THEAD_ITEMS = [
  "ID",
  "Supplier Name",
  "Created at",
  "Status",
  "Total Cost",
] as const;

export function RecentOrdersTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {THEAD_ITEMS.map((item, index) => (
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
