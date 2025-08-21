import { PageHeading } from "@/components";
import { RecentOrdersSection, StatsSection } from "./components";

export default function DashboardPage() {
  return (
    <>
      <PageHeading>Dashboard</PageHeading>
      <StatsSection />
      <RecentOrdersSection />
    </>
  );
}
