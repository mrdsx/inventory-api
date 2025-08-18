import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { Button, buttonVariants } from "./ui";

type NavigationBtnProps = LinkProps &
  React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function NavigationBtn({
  children,
  className,
  href,
  variant,
}: NavigationBtnProps) {
  return (
    <Link href={href}>
      <Button className={cn("text-foreground", className)} variant={variant}>
        {children}
      </Button>
    </Link>
  );
}
