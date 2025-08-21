"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableCell,
  TableRow,
} from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { useFavoriteProductsStore } from "@/features/product";
import { Ellipsis } from "lucide-react";
import { products } from "../../../orders/create/mock-data";
import { FAVORITE_PRODUCTS_TABLE_COLUMNS as tableColumns } from "./favorite-products-table-columns";

export function FavoriteProductsTableBodyContent() {
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

  if (favoriteProducts.length === 0) {
    return (
      <TableRow>
        <TableCell className="py-10 text-center" colSpan={tableColumns.length}>
          No favorite products found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {favoriteProducts.map((product) => {
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
            <TableCell className="pr-10 text-end">{product.cost}</TableCell>
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
                      {isProductInCart ? "Remove from cart" : "Add to cart"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => removeFavoriteProductId(product.id)}
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
      })}
    </>
  );
}
