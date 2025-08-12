import { StatisticsItem } from "@/app/lib";

export function StatsCard({ stats }: { stats: StatisticsItem }) {
  return (
    <div className="card grid gap-2">
      <span className="text-lg text-gray-500">{stats.title}</span>
      <span className="text-xl font-semibold">{stats.value}</span>
    </div>
  );
}
