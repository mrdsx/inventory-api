import { Path } from "@/app/lib";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Button, buttonVariants } from "./ui";

type NavigationBtnProps = { href: Path } & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function NavigationBtn({
  children,
  className,
  href,
  variant,
}: NavigationBtnProps) {
  return (
    <Link href={href} className="max-w-fit">
      <Button className={className} variant={variant}>
        {children}
      </Button>
    </Link>
  );
}
