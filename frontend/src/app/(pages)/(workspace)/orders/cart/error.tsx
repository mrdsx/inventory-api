"use client";

import { ErrorBoundaryProps } from "@/app/lib";
import { ErrorCard } from "@/components";

export default function CartError(props: ErrorBoundaryProps) {
  return (
    <ErrorCard
      title="Cart Error"
      description="Oops! Something went wrong while loading cart."
      toastMessage="Failed to load cart"
      {...props}
    />
  );
}
