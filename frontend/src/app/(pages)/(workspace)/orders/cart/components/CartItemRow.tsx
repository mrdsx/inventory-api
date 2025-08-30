export function CartItemRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="card bg-card flex items-center px-2 py-3.5">{children}</li>
  );
}
