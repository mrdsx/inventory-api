"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function DashboardError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Dashboard Error"
      message="Oops! Something went wrong while loading the dashboard."
      {...props}
    />
  );
}
