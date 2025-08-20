import {
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { products } from "../../orders/create/mock-data";

const favoriteProducts = products.filter((_, i) => i < 20);

export default function FavoriteProductsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl">Favorite products</h2>
      <ScrollArea className="h-120 rounded-sm border">
        <Table className="h-full rounded-sm outline-1 outline-(--border)">
          <TableHeader className="table-header sticky top-0">
            <TableRow>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="">Description</TableHead>
              <TableHead className="w-1/7">Supplier</TableHead>
              <TableHead className="w-1/7">Category</TableHead>
              <TableHead className="w-1/8">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favoriteProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <p className="w-[40ch] overflow-hidden overflow-ellipsis">
                    {product.description}
                  </p>
                </TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
