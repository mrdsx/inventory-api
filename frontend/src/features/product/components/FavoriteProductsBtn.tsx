import { ROUTES } from "@/app/lib";
import { NavigationBtn } from "@/components";
import { Heart } from "lucide-react";

export function FavoriteProductsBtn() {
  return (
    <NavigationBtn href={ROUTES.workspace.products.favorite} variant="outline">
      <Heart />
    </NavigationBtn>
  );
}
