import { RecentOrdersSection } from "./components/RecentOrdersSection/RecentOrdersSection";
import { StatsSection } from "./components/StatsSection/StatsSection";

export default function DashboardPage() {
  return (
    <div className="grid gap-4 p-4">
      <div className="text-2xl">Dashboard</div>
      <StatsSection />
      <RecentOrdersSection />
    </div>
  );
}
