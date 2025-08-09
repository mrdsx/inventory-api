"use client";
import { Button } from "@/components/ui";
import { useThemeStore } from "@/features/theme";
import { Moon, Sun } from "lucide-react";

export function ToggleThemeBtn() {
  const { isDarkMode, setIsDarkMode } = useThemeStore();

  function handleClick() {
    document.body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  }

  return (
    <Button
      variant="outline"
      className="border-(--border-color)"
      onClick={handleClick}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
