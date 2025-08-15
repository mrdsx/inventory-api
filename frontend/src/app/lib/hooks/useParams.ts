"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useParams() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  function setParams(key: string, value: any): void {
    params.set(key, String(value));
  }

  function updatePathname(): void {
    replace(`${pathname}?${params.toString()}`);
  }

  return { params, setParams, updatePathname };
}
