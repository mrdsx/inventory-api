"use client";

import { useSearchParams } from "next/navigation";

export function useParams() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  function setParams(key: string, value: any): void {
    params.set(key, String(value));
  }

  return { params, setParams };
}
