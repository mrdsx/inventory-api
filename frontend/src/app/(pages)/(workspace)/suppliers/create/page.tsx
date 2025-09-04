"use client";

import { handleAPIFetch, ROUTES } from "@/app/lib";
import { GoBackBtn } from "@/components";
import { Button } from "@/components/ui";
import { postSupplier, Supplier } from "@/features/supplier";
import { useRef } from "react";
import { toast } from "sonner";
import { CreateSupplierFormInputs } from "./components/CreateSupplierFormInputs";

export default function CreateSupplierPage() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleAPIFetch(async () => {
      if (nameInputRef.current === null || emailInputRef.current === null)
        return;

      const newSupplier: Supplier = {
        name: nameInputRef.current.value,
        contact_email: emailInputRef.current.value,
      };
      const response = await postSupplier(newSupplier);
      toast.success(response.message);

      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
    });
  }

  return (
    <>
      <GoBackBtn href={ROUTES.workspace.suppliers.root} />
      <div className="card bg-card p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 md:flex-row md:items-end"
        >
          <CreateSupplierFormInputs
            nameInputRef={nameInputRef}
            emailInputRef={emailInputRef}
          />
          <Button type="submit">Create Supplier</Button>
        </form>
      </div>
    </>
  );
}
