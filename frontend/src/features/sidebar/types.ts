import { Path } from "@/app/lib/types";

export type SidebarItem = {
  link: Path;
  icon: React.ReactElement;
  title: string;
  isWorkspaceRoute?: boolean;
};
