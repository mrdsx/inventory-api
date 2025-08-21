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
import { useOrderCartStore } from "@/features/order";
import { useFavoriteProductsStore } from "@/features/product";
import { Ellipsis } from "lucide-react";
import { products } from "../../orders/create/mock-data";
import { FAVORITE_PRODUCTS_TABLE_COLUMNS as tableColumns } from "./components/favorite-products-table-columns";

export default function FavoriteProductsPage() {
  const _cart = useOrderCartStore((state) => state.cart);
  const addToCart = useOrderCartStore((state) => state.addToCart);
  const getItemCount = useOrderCartStore((state) => state.getItemCount);
  const removeItem = useOrderCartStore((state) => state.removeItem);
  const favoriteProductIds = useFavoriteProductsStore(
    (state) => state.favoriteProducts,
  );
  const removeFavoriteProductId = useFavoriteProductsStore(
    (state) => state.removeFavoriteProductId,
  );
  const favoriteProducts = products.filter((i) => favoriteProductIds.has(i.id));

  return (
    <div>
      <h2 className="mb-4 text-2xl">Favorite products</h2>
      <ScrollArea className="h-120 rounded-sm border">
        <Table className="h-full rounded-sm">
          <TableHeader className="table-header sticky top-0">
            <TableRow>
              {tableColumns.map((item, index) => (
                <TableHead className={item.headingClassName} key={index}>
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {favoriteProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  className="py-10 text-center"
                  colSpan={tableColumns.length}
                >
                  No favorite products found
                </TableCell>
              </TableRow>
            ) : (
              favoriteProducts.map((product) => {
                const count = getItemCount(product.id);
                const isProductInCart = count > 0;

                return (
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
                            <DropdownMenuItem
                              onClick={() => {
                                if (isProductInCart) {
                                  removeItem(product.id);
                                } else {
                                  addToCart(product);
                                }
                              }}
                            >
                              {isProductInCart
                                ? "Remove from cart"
                                : "Add to cart"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                removeFavoriteProductId(product.id)
                              }
                              variant="destructive"
                            >
                              Unfavorite
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
