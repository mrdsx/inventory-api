export async function RecentOrdersSection() {
  const res = await fetch(
    "http://127.0.0.1:3000/api/v1/orders?limit=10&order_by_recent=true",
  );
  const orders = await res.json();

  return (
    <div className="card grid gap-2">
      <span className="text-lg">Recent Orders ({orders.length})</span>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-neutral-300 dark:bg-neutral-700">
            <tr>
              <th className="sticky top-0 bg-neutral-300 p-2 text-start">ID</th>
              <th className="sticky top-0 bg-neutral-300 text-start">
                Supplier Name
              </th>
              <th className="sticky top-0 bg-neutral-300 text-start">Date</th>
              <th className="sticky top-0 bg-neutral-300 text-start">Status</th>
              <th className="sticky top-0 bg-neutral-300 text-start">
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
