import { cn } from "@/lib/utils";

export function PageHeading({
  className,
  children,
}: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-2xl", className)}>{children}</h2>;
}
