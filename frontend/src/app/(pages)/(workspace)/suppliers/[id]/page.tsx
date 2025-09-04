import { ROUTES } from "@/app/lib";
import { GoBackBtn, PageHeading } from "@/components";
import { fetchSupplierById } from "@/features/supplier";
import { ChevronRight, Mail, UserRound } from "lucide-react";

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const supplier = await fetchSupplierById(id);

  return (
    <>
      <GoBackBtn href={ROUTES.workspace.suppliers.root} />
      <div className="space-y-2">
        <PageHeading>Supplier's info</PageHeading>
        <div className="card bg-card grid gap-1">
          <div className="flex items-center gap-2">
            <ChevronRight className="size-4" />
            <span className="font-semibold">Supplier ID:</span> {supplier.id}
          </div>
          <div className="flex items-center gap-2">
            <UserRound className="size-4" />
            <span className="font-semibold">Name:</span> {supplier.name}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            <span className="font-semibold">Contact Email:</span>{" "}
            {supplier.contact_email}
          </div>
        </div>
      </div>
    </>
  );
}
