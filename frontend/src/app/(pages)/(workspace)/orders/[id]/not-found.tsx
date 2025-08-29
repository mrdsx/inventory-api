import { ROUTES } from "@/app/lib";
import { GoBackBtn, PageHeading } from "@/components";

export default function OrderNotFound() {
  return (
    <>
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <PageHeading>Order not found</PageHeading>
    </>
  );
}
