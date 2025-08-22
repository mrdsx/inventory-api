import { ColumnDef } from "@tanstack/react-table";

export const SUPPLIERS_TABLE_COLUMNS: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contact_email",
    header: "Contact Email",
  },
] as const;
