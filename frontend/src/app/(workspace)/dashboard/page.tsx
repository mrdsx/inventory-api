import { StatsCard } from "./components/StatsCard";

const statsData = [
  { title: "Total Order", value: "1000" },
  { title: "Total Sales", value: "$10,000" },
  { title: "Total Canceled", value: "50" },
  { title: "Total Pending", value: "500" },
];

export default function DashboardPage() {
  return (
    <div className="p-4">
      <div className="text-2xl mb-4">Dashboard</div>
      <div className="grid grid-cols-4 gap-4">
        {statsData.map((stats, index) => (
          <StatsCard stats={stats} key={stats.title + index} />
        ))}
      </div>
      <div></div>
    </div>
  );
}
