"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui";

export function GoBackBtn() {
  const router = useRouter();

  return (
    <Button className="mb-2" variant="link" onClick={() => router.back()}>
      <ArrowLeft />
      Go back
    </Button>
  );
}
