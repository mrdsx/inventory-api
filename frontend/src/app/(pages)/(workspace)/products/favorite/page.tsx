"use client";

import {
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useFavoriteProductsStore } from "@/features/product";
import { products } from "../../orders/create/mock-data";

export default function FavoriteProductsPage() {
  const favoriteProductIds = useFavoriteProductsStore(
    (state) => state.favoriteProducts,
  );
  const favoriteProducts = products.filter((i) => favoriteProductIds.has(i.id));

  return (
    <div>
      <h2 className="mb-4 text-2xl">Favorite products</h2>
      <ScrollArea className="h-120 rounded-sm border">
        <Table className="h-full rounded-sm">
          <TableHeader className="table-header sticky top-0">
            <TableRow>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="">Description</TableHead>
              <TableHead className="w-1/7">Supplier</TableHead>
              <TableHead className="w-1/7">Category</TableHead>
              <TableHead className="w-1/8 pr-10 text-end">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favoriteProducts.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center" colSpan={5}>
                  No favorite products found
                </TableCell>
              </TableRow>
            ) : (
              favoriteProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <p className="w-[40ch] overflow-hidden overflow-ellipsis">
                      {product.description}
                    </p>
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="pr-10 text-end">
                    {product.cost}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
