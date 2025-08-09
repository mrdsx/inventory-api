import { ROUTES } from "@/app/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { ChartLine, ListChecks, Package2, Users } from "lucide-react";
import { MenuItem } from "./AppSidebar";

const items: MenuItem[] = [
  { link: ROUTES.DASHBOARD, icon: ChartLine, title: "Dashboard" },
  { link: ROUTES.PRODUCTS, icon: Package2, title: "Products" },
  { link: ROUTES.ORDERS, icon: ListChecks, title: "Orders" },
  { link: ROUTES.SUPPLIERS, icon: Users, title: "Suppliers" },
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
