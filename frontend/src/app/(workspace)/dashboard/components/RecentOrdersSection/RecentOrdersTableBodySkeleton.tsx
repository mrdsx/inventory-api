import { Skeleton } from "@/components/ui";

const COLUMNS_COUNT = 5;
const ROWS_COUNT = 3;

export function RecentOrdersTableBodySkeleton() {
  return (
    <>
      {new Array(ROWS_COUNT).fill(null).map((_) => (
        <tr>
          {new Array(COLUMNS_COUNT).fill(null).map((_) => (
            <th className="p-2">
              <Skeleton className="h-5 w-full" />
            </th>
          ))}
        </tr>
      ))}
    </>
  );
}
