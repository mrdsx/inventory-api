"use client";

import { ErrorCard } from "@/components";

export default function DashboardError(props: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorCard
      title="Dashboard Error"
      message="Oops! Something went wrong while loading the dashboard."
      {...props}
    />
  );
}
