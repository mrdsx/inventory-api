"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Product, useFavoriteProductsStore } from "@/features/product";
import { Ellipsis } from "lucide-react";
import { products } from "../../orders/create/mock-data";

export default function FavoriteProductsPage() {
  const favoriteProductIds = useFavoriteProductsStore(
    (state) => state.favoriteProducts,
  );
  const removeFavoriteProductId = useFavoriteProductsStore(
    (state) => state.removeFavoriteProductId,
  );
  const favoriteProducts = products.filter((i) => favoriteProductIds.has(i.id));

  function handleDeleteFromFavorites(product: Product) {
    removeFavoriteProductId(product.id);
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl">Favorite products</h2>
      <ScrollArea className="h-120 rounded-sm border">
        <Table className="h-full rounded-sm">
          <TableHeader className="table-header sticky top-0">
            <TableRow>
              <TableHead className="w-1/4">Name </TableHead>
              <TableHead>Description </TableHead>
              <TableHead className="w-1/7">Supplier </TableHead>
              <TableHead className="w-1/7">Category </TableHead>
              <TableHead className="w-1/8 pr-10 text-end">Cost</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {favoriteProducts.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center" colSpan={6}>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="size-7">
                        <Button variant="ghost">
                          <Ellipsis className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          {/* <DropdownMenuItem>Add to order</DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() => handleDeleteFromFavorites(product)}
                            variant="destructive"
                          >
                            Remove from favorites
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
