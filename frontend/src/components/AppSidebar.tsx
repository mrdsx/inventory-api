import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui";
import { ToggleThemeBtn } from "@/features/theme";
import {
  ChartLine,
  ListChecks,
  LogOut,
  Component as LucideIcon,
  Package2,
  Settings,
  Users,
} from "lucide-react";

type Item = {
  link: string;
  icon: typeof LucideIcon;
  title: string;
};

const items1: Item[] = [
  { link: "#", icon: ChartLine, title: "Dashboard" },
  { link: "#", icon: Package2, title: "Products" },
  { link: "#", icon: ListChecks, title: "Orders" },
  { link: "#", icon: Users, title: "Suppliers" },
];

const items2: Item[] = [
  { link: "#", icon: Settings, title: "Settings" },
  { link: "#", icon: LogOut, title: "Log Out" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="ml-2 mt-2">Inventory API</h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items1.map((item) => (
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
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
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
      </SidebarContent>
      <SidebarFooter>
        <ToggleThemeBtn />
      </SidebarFooter>
    </Sidebar>
  );
}
