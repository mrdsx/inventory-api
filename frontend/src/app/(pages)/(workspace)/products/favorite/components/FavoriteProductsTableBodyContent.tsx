"use client";

import { TableCell, TableRow } from "@/components/ui";
import { useFavoriteProductsStore } from "@/features/product";
import { products } from "../../../orders/create/mock-data";
import { FAVORITE_PRODUCTS_TABLE_COLUMNS as tableColumns } from "./favorite-products-table-columns";
import { TableRowDropdownMenu } from "./TableRowDropdownMenu/TableRowDropdownMenu";

export function FavoriteProductsTableBodyContent() {
  const favoriteProductIds = useFavoriteProductsStore(
    (state) => state.favoriteProducts,
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
          <TableCell className="pr-10 text-end">{product.cost}</TableCell>
          <TableCell>
            <TableRowDropdownMenu product={product} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
