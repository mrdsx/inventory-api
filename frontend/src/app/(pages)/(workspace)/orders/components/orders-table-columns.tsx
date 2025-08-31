"use client";

import { ROUTES } from "@/app/lib";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { OrderResponse, ORDERS_TABLE_COLUMNS } from "@/features/order";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, FileText, ListOrdered, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const ordersTableColumns: ColumnDef<OrderResponse>[] = [
  ...ORDERS_TABLE_COLUMNS.map(({ header, accessorKey }) => ({
    header,
    accessorKey,
  })),
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
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
                navigator.clipboard.writeText(JSON.stringify(order.id))
              }
            >
              <Copy />
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`${ROUTES.workspace.orders.root}/${order.id}`)
              }
            >
              <FileText />
              View order
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`${ROUTES.workspace.orders.root}/${order.id}/items`)
              }
            >
              <ListOrdered />
              View order items
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
