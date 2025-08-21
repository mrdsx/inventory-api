import { ROUTES } from "@/app/lib";
import { GoBackBtn } from "@/components";
import { OrderCartBtn } from "@/features/order";
import { FavoriteProductsBtn } from "@/features/product";

export function CreateOrderPageActions() {
  return (
    <div className="mb-1 flex justify-between">
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <div className="mr-4 flex gap-2">
        <FavoriteProductsBtn />
        <OrderCartBtn />
      </div>
    </div>
  );
}
