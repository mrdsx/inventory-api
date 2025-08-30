import { apiClient, ENDPOINTS, ROUTES } from "@/app/lib";
import { GoBackBtn, PageHeading } from "@/components";
import { ScrollArea } from "@/components/ui";
import { OrderItemResponse } from "@/features/order";
import { OrderItem } from "./components/OrderItem";

const { orders } = ENDPOINTS;

export default async function OrderItemsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const orderItems = await apiClient<OrderItemResponse[]>(
    `${orders}/${id}/items`,
  );
  const totalOrderItemsCost = orderItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0,
  );

  return (
    <>
      <GoBackBtn href={`${ROUTES.workspace.orders.root}/${id}`} />
      <PageHeading>
        Order #{id} - {orderItems.length} items
      </PageHeading>
      <ScrollArea className="h-100">
        <ul className="grid gap-2">
          {orderItems.map((item) => (
            <li key={item.id}>
              <OrderItem item={item} />
            </li>
          ))}
        </ul>
      </ScrollArea>
      <span className="text-xl">Total cost: ${totalOrderItemsCost}</span>
    </>
  );
}
