import { StatsCard } from "./components/StatsCard";

const statsData = [
  { title: "Total Order", value: "1000" },
  { title: "Total Sales", value: "$10,000" },
  { title: "Total Canceled", value: "50" },
  { title: "Total Pending", value: "500" },
];

export default function DashboardPage() {
  return (
    <div className="p-4 grid gap-4">
      <div className="text-2xl">Dashboard</div>
      <div className="grid grid-cols-4 gap-4">
        {statsData.map((stats, index) => (
          <StatsCard stats={stats} key={stats.title + index} />
        ))}
      </div>
      <div className="grid gap-2 card">
        <span className="text-lg">Recent Orders</span>
        <table className="w-full">
          <thead className="bg-neutral-300 dark:bg-neutral-700">
            <tr>
              <th className="text-start p-2">ID</th>
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
    </div>
  );
}
