import { GoBackBtn, PageHeading } from "@/components";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <>
      <GoBackBtn />
      <PageHeading>Order #{id}</PageHeading>
    </>
  );
}
