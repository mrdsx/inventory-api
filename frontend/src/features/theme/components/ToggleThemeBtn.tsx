"use client";
import { Button, buttonVariants } from "@/components/ui";
import { useThemeStore } from "@/features/theme";
import { VariantProps } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";

type ToggleThemeBtnProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function ToggleThemeBtn({ size, className }: ToggleThemeBtnProps) {
  const { isDarkMode, setIsDarkMode } = useThemeStore();

  function handleClick() {
    document.body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  }

  return (
    <Button
      className={className}
      variant="outline"
      onClick={handleClick}
      size={size}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
