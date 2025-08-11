type StatsItem = {
  title: string;
  value: string | number;
};

export function StatsCard({ stats }: { stats: StatsItem }) {
  return (
    <div className="card grid gap-2">
      <span className="text-lg text-gray-500">{stats.title}</span>
      <span className="text-xl font-semibold">{stats.value}</span>
    </div>
  );
}
