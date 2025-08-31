import { OrderItemResponse } from "@/features/order";

export function OrderItem({ item }: { item: OrderItemResponse }) {
  return (
    <div className="card bg-card grid">
      <div className="flex justify-between">
        <h3 className="text-lg">
          {item.name}{" "}
          <span className="text-foreground/50">({item.quantity})</span>
        </h3>
        <span>{item.category}</span>
      </div>
      <p className="text-muted-foreground">{item.description}</p>
      <span className="mt-4">${item.cost.toFixed(2)}</span>
    </div>
  );
}
