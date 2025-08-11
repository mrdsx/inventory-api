import { Button, Input } from "@/components/ui";

export function OrdersActions() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row">
      <div className="ring-border w-[50vw] sm:w-1/2">
        <Input placeholder="Search orders" />
      </div>
      <Button className="bg-primary hover:bg-primary/80 px-3 py-1 font-semibold text-white">
        Create Order
      </Button>
    </div>
  );
}
