export function StatsCard({ stats }: { stats: any }) {
  return (
    <div className="grid gap-2 shadow-sm rounded-md dark:border-border dark:border-1 p-4">
      <span className="text-lg text-gray-500">{stats.title}</span>
      <span className="text-xl font-semibold">{stats.value}</span>
    </div>
  );
}
