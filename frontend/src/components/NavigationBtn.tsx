import { ArrowLeft } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { Button } from "./ui";

type NavigationBtnProps = LinkProps & React.ComponentProps<"button">;

export function NavigationBtn({
  children,
  className,
  href,
}: NavigationBtnProps) {
  return (
    <Link href={href}>
      <Button className={className} variant="link">
        <ArrowLeft />
        {children}
      </Button>
    </Link>
  );
}
