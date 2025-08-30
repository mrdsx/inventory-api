"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function OrderItemsError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Order Items Error"
      description="Oops! Something went wrong while loading order items."
      toastMessage="Failed to load order items"
      {...props}
    />
  );
}
