"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function SupplierPage(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Supplier Error"
      description="Oops! Something went wrong while fetching supplier."
      toastMessage="Failed to load supplier"
      {...props}
    />
  );
}
