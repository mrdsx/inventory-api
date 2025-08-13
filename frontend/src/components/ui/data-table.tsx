"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PaginatedResponse } from "@/app/lib";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
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

type DataTableContextType = {
  paginatedData: any;
  setPaginatedData: (data: any) => void;
};

const DataTableContext = createContext<DataTableContextType | null>(null);

function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === null) {
    throw new Error(
      "DataTableContext must be used inside DataTableContextProvider",
    );
  }

  return context;
}

function DataTableProvider<TData>({ children }: { children: React.ReactNode }) {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<TData>>({
    items: [] as TData,
    total: 0,
    page: 0,
    size: 0,
    pages: 0,
  });

  return (
    <DataTableContext.Provider value={{ paginatedData, setPaginatedData }}>
      {children}
    </DataTableContext.Provider>
  );
}

function DataTable<TData, TValue>({
  columns,
  className,
  data,
  paginatedData,
}: DataTableProps<TData, TValue> &
  React.ComponentProps<"div"> & { paginatedData: PaginatedResponse<any> }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { setPaginatedData } = useDataTable();
  setPaginatedData(paginatedData);

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

      <DataTableActions />
    </div>
  );
}

function DataTableActions() {
  const { paginatedData } = useDataTable();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const {
    page: currentPage,
    total: totalItems,
    pages: totalPages,
    size: pageSize,
    items,
  } = paginatedData;
  const range = `${pageSize * currentPage - (pageSize - 1)}-${pageSize * (currentPage - 1) + items.length}`;

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
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export { DataTable, DataTableProvider, useDataTable };
