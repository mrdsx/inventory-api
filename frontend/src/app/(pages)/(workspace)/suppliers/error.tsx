"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function SuppliersError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Suppliers Error"
      description="Oops! Something went wrong while loading suppliers."
      toastMessage="Failed to load suppliers"
      {...props}
    />
  );
}
