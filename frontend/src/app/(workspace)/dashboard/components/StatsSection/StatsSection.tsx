import { StatsCard } from "./StatsCard";

const statsData = [
  { title: "Total Order", value: "1000" },
  { title: "Total Sales", value: "$10,000" },
  { title: "Total Canceled", value: "50" },
  { title: "Total Pending", value: "500" },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {statsData.map((stats, index) => (
        <StatsCard stats={stats} key={stats.title + index} />
      ))}
    </div>
  );
}
