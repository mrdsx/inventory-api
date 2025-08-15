"use client";

import { ROUTES } from "@/app/lib";
import { Button } from "@/components/ui";
import Link from "next/link";

export function CreateOrderBtn() {
  function handleClick() {
    console.log("hi");
  }

  return (
    <Button
      className="bg-primary hover:bg-primary/80 px-3 py-1 font-semibold text-white"
      onClick={handleClick}
    >
      <Link href={ROUTES.workspace.orders.create}>Create Order</Link>
    </Button>
  );
}
