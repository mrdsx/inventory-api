"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ParamsState = {
  params: URLSearchParams;
  setParams: (key: string, value: any) => void;
  updatePathname: () => void;
};

export function useParams(): ParamsState {
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
