import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "./ui";

export function SearchBar({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className={cn("relative w-full", className)}>
      <Input type="text" className="pl-8" {...props} />
      <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
