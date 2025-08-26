"use client";

import { toast } from "sonner";

export async function handleAPIFetch(
  callbackFn: () => void | Promise<void>,
): Promise<void> {
  try {
    await callbackFn();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      console.error(error.message);
    }
    console.error(error);
  }
}
