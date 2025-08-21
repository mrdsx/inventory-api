import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product } from "@/features/product";
import { Ellipsis } from "lucide-react";
import { AddProductToCart } from "./AddProductToCart";
import { RemoveProductFromCart } from "./RemoveProductFromCart";
import { UnfavoriteProduct } from "./UnfavoriteProduct";

export function TableRowDropdownMenu({ product }: { product: Product }) {
  const count = useOrderCartStore((state) => state.getItemCount(product.id));
  const isProductInCart = count > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="size-7">
        <Button variant="ghost">
          <Ellipsis className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {isProductInCart ? (
            <RemoveProductFromCart product={product} />
          ) : (
            <AddProductToCart product={product} />
          )}
          <UnfavoriteProduct product={product} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
