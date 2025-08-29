import { ROUTES } from "@/app/lib";
import { GoBackBtn, PageHeading } from "@/components";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <>
      <GoBackBtn href={ROUTES.workspace.orders.root} />
      <PageHeading>Order #{id}</PageHeading>
    </>
  );
}
