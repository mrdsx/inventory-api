"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function OrdersError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Orders Error"
      message="Oops! Something went wrong while loading orders."
      toastMessage="Failed to load orders"
      {...props}
    />
  );
}
