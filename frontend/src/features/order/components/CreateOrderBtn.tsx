"use client";

import { Button } from "@/components/ui";

export function CreateOrderBtn() {
  function handleClick() {
    console.log("hi");
  }

  return (
    <Button
      className="bg-primary hover:bg-primary/80 px-3 py-1 font-semibold text-white"
      onClick={handleClick}
    >
      Create Order
    </Button>
  );
}
