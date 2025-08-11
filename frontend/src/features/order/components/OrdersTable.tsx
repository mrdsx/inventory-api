import { ScrollArea, Table } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Root as ScrollAreaRoot } from "@radix-ui/react-scroll-area";
import { OrdersTableHeader } from "./OrdersTableHeader";

export function OrdersTable({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & React.ComponentProps<typeof ScrollAreaRoot>) {
  return (
    <ScrollArea className={cn("h-100 rounded-sm border", className)} {...props}>
      <Table>
        <OrdersTableHeader />
        {children}
      </Table>
    </ScrollArea>
  );
}
