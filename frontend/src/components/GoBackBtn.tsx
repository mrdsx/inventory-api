"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui";

export function GoBackBtn({ className }: React.ComponentProps<"button">) {
  const router = useRouter();

  return (
    <Button className={className} variant="link" onClick={() => router.back()}>
      <ArrowLeft />
      Go back
    </Button>
  );
}
