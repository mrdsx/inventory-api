"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PaginatedResponse, SEARCH_PARAMS_KEYS } from "@/app/lib";
import { ContentLoader } from "@/components";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const { ITEMS_PER_PAGE, PAGE } = SEARCH_PARAMS_KEYS;

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
} & Partial<PropsWithPaginationData>;

type PropsWithPaginationData = {
  paginationData: PaginatedResponse<any>;
};

function DataTable<TData, TValue = unknown>({
  columns,
  className,
  isLoading = false,
  paginationData,
}: DataTableProps<TData, TValue> & React.ComponentProps<"div">) {
  const table = useReactTable({
    data: paginationData?.items || [],
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
                    <TableHead
                      className="font-semibold"
                      style={{ width: `${header.getSize()}px` }}
                      key={header.id}
                    >
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
            {isLoading || paginationData === undefined ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <ContentLoader />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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

      {paginationData && <DataTableActions paginationData={paginationData} />}
    </div>
  );
}

function DataTableActions({ paginationData }: PropsWithPaginationData) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page: currentPage, pages: totalPages } = paginationData;

  function handleClick(newPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE, String(newPage));
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-5 flex h-5 items-center justify-end gap-3">
      <PageSizeSelect />
      <PaginationInfo paginationData={paginationData} />
      <div className="flex items-center rounded-md border">
        <PreviousPageBtn
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage <= 1}
        />
        <NextPageBtn
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
}

const PAGE_SIZES = ["10", "25", "50"];

function PageSizeSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(ITEMS_PER_PAGE, value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select defaultValue={PAGE_SIZES[0]} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PAGE_SIZES.map((size, index) => (
            <SelectItem value={size} key={size + index}>
              {size} per page
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function PaginationInfo({ paginationData }: PropsWithPaginationData) {
  const {
    items,
    page: currentPage,
    size: pageSize,
    total: totalItemsCount,
  } = paginationData;

  const rangeStart = pageSize * currentPage - pageSize + 1;
  const rangeEnd = pageSize * (currentPage - 1) + items.length;
  const range = `${rangeStart}-${rangeEnd}`;

  return (
    <div className="grid h-8 place-content-center rounded-md border px-3 text-sm">
      {range} of {totalItemsCount}
    </div>
  );
}

function PreviousPageBtn(props: React.ComponentProps<"button">) {
  return (
    <Button variant="ghost" size="sm" {...props}>
      <ChevronLeft />
    </Button>
  );
}

function NextPageBtn(props: React.ComponentProps<"button">) {
  return (
    <Button variant="ghost" size="sm" {...props}>
      <ChevronRight />
    </Button>
  );
}

export { DataTable };
