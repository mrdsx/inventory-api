import { StatisticsItem } from "@/app/lib";
import "./stats-card.css";

export function StatisticsCard({ stats }: { stats: StatisticsItem }) {
  return (
    <div className="card stats-card">
      <span className="text-lg text-gray-500">{stats.title}</span>
      <span className="text-xl font-semibold">{stats.value}</span>
    </div>
  );
}
