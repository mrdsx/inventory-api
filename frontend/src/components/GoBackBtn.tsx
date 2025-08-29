"use client";

import { Path } from "@/app/lib";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui";

export function GoBackBtn({
  className,
  href,
}: React.ComponentProps<"button"> & { href?: Path }) {
  const router = useRouter();

  const button = (
    <Button
      className={className}
      variant="link"
      onClick={() => {
        if (href === undefined) router.back();
      }}
    >
      <ArrowLeft />
      Go back
    </Button>
  );
  return href ? <Link href={href}>{button}</Link> : button;
}
