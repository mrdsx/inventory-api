"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useEditSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return function (key: string, value: any) {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(value));
    replace(`${pathname}?${params.toString()}`);
  };
}
