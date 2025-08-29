import { Input, Label } from "@/components/ui";

type CreateSupplierFormInputsProps = {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
};

export function CreateSupplierFormInputs({
  nameInputRef,
  emailInputRef,
}: CreateSupplierFormInputsProps) {
  return (
    <>
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
    </>
  );
}
