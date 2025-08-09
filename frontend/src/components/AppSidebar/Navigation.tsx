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
  { link: "#", icon: ChartLine, title: "Dashboard" },
  { link: "#", icon: Package2, title: "Products" },
  { link: "#", icon: ListChecks, title: "Orders" },
  { link: "#", icon: Users, title: "Suppliers" },
];

export function Navigation() {
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
