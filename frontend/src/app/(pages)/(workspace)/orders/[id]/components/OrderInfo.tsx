import { OrderResponse } from "@/features/order";
import { cn } from "@/lib/utils";
import { getOrderFields } from "../order-info-rows";

export function OrderInfo({ order }: { order: OrderResponse }) {
  const orderFields = getOrderFields(order.status);

  return (
    <div className="card grid gap-1">
      {orderFields.map((field) => (
        <div
          className={cn("flex items-center gap-2", field.fieldClassName)}
          key={field.title}
        >
          <field.icon className={cn("size-4", field.iconClassName)} />
          <div>
            <span className="font-semibold">{field.title}</span>:{" "}
            <span className={field.accessKeyClassName}>
              {order[field.accessKey]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
