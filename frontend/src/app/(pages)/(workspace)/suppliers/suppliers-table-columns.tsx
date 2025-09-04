import { ROUTES } from "@/app/lib";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { SupplierResponse } from "@/features/supplier";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const SUPPLIERS_TABLE_COLUMNS: ColumnDef<SupplierResponse>[] = [
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
  {
    id: "actions",
    enableHiding: false,
    size: 30,
    cell: ({ row }) => {
      const supplier = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-0" size="xs" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                router.push(`${ROUTES.workspace.suppliers.root}/${supplier.id}`)
              }
            >
              <FileText />
              View supplier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
] as const;
