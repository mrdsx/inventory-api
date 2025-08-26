import { PageHeading } from "@/components";
import { RecentOrdersSection, StatisticsSection } from "./components";

export default function DashboardPage() {
  return (
    <>
      <PageHeading>Dashboard</PageHeading>
      <StatisticsSection />
      <RecentOrdersSection />
    </>
  );
}
