"use client";

import { toast } from "sonner";

export async function handleAPIFetch<T>(
  callbackFn: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await callbackFn();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      console.error(error.message);
    }
    console.error(error);
  }
}
