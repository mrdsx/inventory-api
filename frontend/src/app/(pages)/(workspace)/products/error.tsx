"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function ProductsError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Products Error"
      description="Oops! Something went wrong while loading products."
      toastMessage="Failed to load products"
      {...props}
    />
  );
}
