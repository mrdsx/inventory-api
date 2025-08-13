import { ContentLoader } from "@/components";
import { Suspense } from "react";
import { RecentOrdersSection, StatsSection } from "./components";

export default function DashboardPage() {
  return (
    <>
      <div className="text-2xl">Dashboard</div>
      <StatsSection />
      <Suspense fallback={<ContentLoader />}>
        <RecentOrdersSection />
      </Suspense>
    </>
  );
}
