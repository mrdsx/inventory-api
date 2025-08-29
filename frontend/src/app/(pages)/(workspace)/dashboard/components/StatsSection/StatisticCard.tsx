import { StatisticsItem } from "@/app/lib";
import "./statistic-card.css";

export function StatisticCard({ statistic }: { statistic: StatisticsItem }) {
  return (
    <div className="card stats-card">
      <span className="text-lg text-gray-500">{statistic.title}</span>
      <span className="text-xl font-semibold">{statistic.value}</span>
    </div>
  );
}
