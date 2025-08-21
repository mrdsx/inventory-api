import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useOrderCartStore } from "@/features/order";
import { Product, useFavoriteProductsStore } from "@/features/product";
import { Ellipsis } from "lucide-react";

export function TableRowDropdownMenu({ product }: { product: Product }) {
  const addToCart = useOrderCartStore((state) => state.addToCart);
  const count = useOrderCartStore((state) => state.getItemCount(product.id));
  const removeItem = useOrderCartStore((state) => state.removeItem);
  const removeFavoriteProductId = useFavoriteProductsStore(
    (state) => state.removeFavoriteProductId,
  );

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
  );
}
