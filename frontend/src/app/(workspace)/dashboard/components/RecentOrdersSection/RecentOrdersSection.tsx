// TODO: add type OrderResponse
// TODO: replace table row in orders.map() with OrderRow

import { OrderResponse } from "@/features/order";

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
              <th className="sticky top-0 bg-neutral-300 p-2 text-start dark:bg-gray-800">
                ID
              </th>
              <th className="sticky top-0 bg-neutral-300 text-start dark:bg-gray-800">
                Supplier Name
              </th>
              <th className="sticky top-0 bg-neutral-300 text-start dark:bg-gray-800">
                Date
              </th>
              <th className="sticky top-0 bg-neutral-300 text-start dark:bg-gray-800">
                Status
              </th>
              <th className="sticky top-0 bg-neutral-300 text-start dark:bg-gray-800">
                Total Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <th className="p-2 text-start font-normal">
                  Order #{order.id}
                </th>
                <th className="text-start font-normal">
                  {order.supplier_name}
                </th>
                <th className="text-start font-normal">{order.date}</th>
                <th className="text-start font-normal">{order.status}</th>
                <th className="text-start font-normal">{order.total_cost}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
