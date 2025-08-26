"use client";

import { useThemeStore } from "@/features/theme";
import { Toaster } from "sonner";

export function AppToaster() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <Toaster
      position="top-center"
      richColors
      theme={isDarkMode ? "dark" : "light"}
    />
  );
}
