"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PaginatedOrdersResponse } from "@/features/order/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  className,
  data,
  paginatedData,
}: DataTableProps<TData, TValue> &
  React.ComponentProps<"div"> & { paginatedData: PaginatedOrdersResponse }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <ScrollArea className={cn("rounded-md border", className)}>
        <Table>
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="bg-gray-100 hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="font-semibold" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <DataTableActions paginatedData={paginatedData} />
    </div>
  );
}

function DataTableActions({
  paginatedData,
}: {
  paginatedData: PaginatedOrdersResponse;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page, total: totalItems, pages, size, items } = paginatedData;
  const range = `${size * page - (size - 1)}-${size * (page - 1) + items.length}`;

  function handleClick(newPage: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-5 flex h-5 items-center justify-end gap-3">
      <div className="grid h-8 place-content-center rounded-md border px-3 text-sm">
        {range} of {totalItems}
      </div>
      <div className="rounded-md border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleClick(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleClick(page + 1)}
          disabled={page >= pages}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export { DataTable };
