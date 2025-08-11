import { Skeleton } from "@/components/ui";

const COLUMNS = Array(5).fill(0);
const ROWS = Array(3).fill(0);
const SUPPLIER_NAME_COLUMN_INDEX = 1;

export function RecentOrdersTableBodySkeleton() {
  return (
    <>
      {ROWS.map((_) => (
        <tr>
          {COLUMNS.map((_, index) => {
            const skeletonStyles =
              index === SUPPLIER_NAME_COLUMN_INDEX ? "w-[60%]" : "w-full";

            return (
              <th className="p-2">
                <Skeleton className={`h-5 ${skeletonStyles}`} />
              </th>
            );
          })}
        </tr>
      ))}
    </>
  );
}
