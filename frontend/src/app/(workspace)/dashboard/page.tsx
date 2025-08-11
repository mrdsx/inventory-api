import { WorkspacePageContentLoader } from "@/features/workspace";
import { Suspense } from "react";
import { RecentOrdersSection, StatsSection } from "./components";

export default function DashboardPage() {
  return (
    <>
      <div className="text-2xl">Dashboard</div>
      <StatsSection />
      <Suspense fallback={<WorkspacePageContentLoader />}>
        <RecentOrdersSection />
      </Suspense>
    </>
  );
}
