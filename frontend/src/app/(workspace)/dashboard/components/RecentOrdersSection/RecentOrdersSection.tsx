import { OrderResponse } from "@/features/order";
import { OrderRow } from "./OrderRow";

const THEAD_ITEMS = [
  "ID",
  "Supplier Name",
  "Created at",
  "Status",
  "Total Cost",
];

// TODO: extract repeating styles
export async function RecentOrdersSection() {
  const res = await fetch(
    "http://127.0.0.1:3000/api/v1/orders?limit=10&order_by_recent=true",
  );
  const orders: OrderResponse[] = await res.json();

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              {THEAD_ITEMS.map((item, index) => (
                <th
                  className="sticky top-0 bg-neutral-300 p-2 text-start dark:bg-gray-800"
                  key={item + index}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow order={order} key={order.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
