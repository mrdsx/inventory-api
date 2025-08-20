"use client";

import { useThemeStore } from "@/features/theme";

export function Body({ children }: { children: React.ReactNode }) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const className = isDarkMode ? "dark" : "";

  return <body className={className}>{children}</body>;
}
