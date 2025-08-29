"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function OrderError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Order Error"
      description="Oops! Something went wrong while loading order."
      toastMessage="Failed to load order"
      {...props}
    />
  );
}
