import { ROUTES } from "@/app/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { ChartLine, ListChecks, Package2, Users } from "lucide-react";
import { SidebarItem } from "./AppSidebar";

const { workspace } = ROUTES;
const items: SidebarItem[] = [
  { link: workspace.dashboard, icon: ChartLine, title: "Dashboard" },
  { link: workspace.products, icon: Package2, title: "Products" },
  { link: workspace.orders, icon: ListChecks, title: "Orders" },
  { link: workspace.suppliers, icon: Users, title: "Suppliers" },
];

export function Workspace() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.link}>
                  <item.icon />
                  {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
