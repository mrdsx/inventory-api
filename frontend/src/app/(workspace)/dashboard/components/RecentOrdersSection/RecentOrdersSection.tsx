export function RecentOrdersSection() {
  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders</span>
      <table className="w-full">
        <thead className="bg-neutral-300 dark:bg-neutral-700">
          <tr>
            <th className="p-2 text-start">ID</th>
            <th className="text-start">Supplier Name</th>
            <th className="text-start">Date</th>
            <th className="text-start">Status</th>
            <th className="text-start">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">Order #1</td>
            <td>Logitech</td>
            <td>2025-08-10</td>
            <td>Pending</td>
            <td>$1,200.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
