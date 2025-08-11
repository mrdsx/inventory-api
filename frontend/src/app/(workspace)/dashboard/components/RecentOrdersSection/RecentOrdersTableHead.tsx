const THEAD_ITEMS = [
  "ID",
  "Supplier Name",
  "Created at",
  "Status",
  "Total Cost",
] as const;

export function RecentOrdersTableHead() {
  return (
    <thead>
      <tr>
        {THEAD_ITEMS.map((item, index) => (
          <th
            className="sticky top-0 bg-neutral-300 p-2 text-start dark:bg-gray-800"
            key={item + index}
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
}
