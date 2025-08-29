import { Skeleton } from "@/components/ui";
import React from "react";

export function OrderInfoSkeleton() {
  return (
    <>
      <Skeleton className="mb-4 h-4 w-30" />
      <div className="card space-y-2">
        <Skeleton className="h-4 w-50" />
        <Skeleton className="h-4 w-50" />
        <Skeleton className="h-4 w-50" />
        <Skeleton className="h-4 w-50" />
        <Skeleton className="mt-4 h-4 w-50" />
      </div>
    </>
  );
}
