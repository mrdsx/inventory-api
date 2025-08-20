import { ScrollArea } from "@/components/ui";
import { products } from "../../orders/create/mock-data";

export default function FavoriteProductsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Favorite products</h2>
      <ScrollArea className="bg-card mt-2 h-120 rounded-md border-1 px-4 py-2 shadow-xs">
        <ul className="grid gap-2">
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
