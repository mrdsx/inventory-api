import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export function ContentLoader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-5 flex justify-center", className)} {...props}>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
