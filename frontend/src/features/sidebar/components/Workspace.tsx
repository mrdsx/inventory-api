import { ROUTES } from "@/app/lib/constants";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui";
import { SidebarItem } from "@/features/sidebar";
import { ChartLine, ListChecks, Package2, Users } from "lucide-react";
import { AppSidebarItem } from "./AppSidebarItem";

const { workspace } = ROUTES;
const items: SidebarItem[] = [
  {
    link: workspace.dashboard,
    icon: <ChartLine />,
    title: "Dashboard",
    isWorkspaceRoute: true,
  },
  {
    link: workspace.products,
    icon: <Package2 />,
    title: "Products",
    isWorkspaceRoute: true,
  },
  {
    link: workspace.orders,
    icon: <ListChecks />,
    title: "Orders",
    isWorkspaceRoute: true,
  },
  {
    link: workspace.suppliers,
    icon: <Users />,
    title: "Suppliers",
    isWorkspaceRoute: true,
  },
];

export function Workspace() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <AppSidebarItem item={item} key={item.title} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
