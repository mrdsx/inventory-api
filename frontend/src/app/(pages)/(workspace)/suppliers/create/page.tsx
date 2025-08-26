"use client";

import { handleAPIFetch } from "@/app/lib";
import { GoBackBtn } from "@/components";
import { Button, Input, Label } from "@/components/ui";
import { createSupplier, Supplier } from "@/features/supplier";
import { useRef } from "react";
import { toast } from "sonner";

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
      const response = await createSupplier(newSupplier);
      toast.success(response.message);

      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
    });
  }

  return (
    <>
      <GoBackBtn />
      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <Label htmlFor="name">Supplier Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter supplier name"
                required
                ref={nameInputRef}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter e-mail address"
                required
                ref={emailInputRef}
              />
            </div>
            <Button type="submit">Create Supplier</Button>
          </div>
        </form>
      </div>
    </>
  );
}
