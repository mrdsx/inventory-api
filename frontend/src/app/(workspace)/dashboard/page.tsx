import { RecentOrdersSection, StatsSection } from "./components";

export default function DashboardPage() {
  return (
    <>
      <div className="text-2xl">Dashboard</div>
      <StatsSection />
      <RecentOrdersSection />
    </>
  );
}
