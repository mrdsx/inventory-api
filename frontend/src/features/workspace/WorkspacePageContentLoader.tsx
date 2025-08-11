import { LoaderCircle } from "lucide-react";

export function WorkspacePageContentLoader() {
  return (
    <div className="mt-5 flex justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
