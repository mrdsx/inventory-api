import { RecentOrdersSection, StatsSection } from "./components";

export default function DashboardPage() {
  return (
    <div className="grid gap-4 p-4">
      <div className="text-2xl">Dashboard</div>
      <StatsSection />
      <RecentOrdersSection />
    </div>
  );
}
