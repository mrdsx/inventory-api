import { Path } from "@/app/lib";
import { ArrowLeft } from "lucide-react";
import { NavigationBtn } from "./NavigationBtn";

export function GoBackBtn({ href }: { href: Path }) {
  return (
    <NavigationBtn className="mb-2" href={href} variant="link">
      <ArrowLeft />
      Go back
    </NavigationBtn>
  );
}
