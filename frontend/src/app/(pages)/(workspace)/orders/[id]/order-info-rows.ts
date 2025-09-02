import {
  getOrderStatusClassName,
  ORDER_STATUS,
  OrderResponse,
} from "@/features/order";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  LucideIcon,
  SquareCheck,
  UserRound,
} from "lucide-react";

type OrderField = {
  icon: LucideIcon;
  title: string;
  accessKey: keyof OrderResponse;
  accessKeyClassName?: string;
  fieldClassName?: string;
  iconClassName?: string;
};

export function getOrderFields(status: ORDER_STATUS): OrderField[] {
  const orderStatusClassName = getOrderStatusClassName(status);

  return [
    {
      icon: ChevronRight,
      title: "Order ID",
      accessKey: "id",
    },
    {
      icon: CalendarDays,
      title: "Created at",
      accessKey: "date",
    },
    {
      icon: SquareCheck,
      title: "Status",
      accessKey: "status",
      accessKeyClassName: cn("px-2 py-1 rounded-lg", orderStatusClassName),
    },
    {
      icon: CircleDollarSign,
      title: "Total cost",
      accessKey: "total_cost",
      fieldClassName: "text-xl mt-2",
      iconClassName: "size-5",
    },
  ];
}
