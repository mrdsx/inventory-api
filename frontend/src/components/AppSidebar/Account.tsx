import { ROUTES } from "@/app/routes";
import { LogOut, Settings } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui";
import { SidebarItem } from "./AppSidebar";

const items: SidebarItem[] = [
  { link: ROUTES.settings, icon: Settings, title: "Settings" },
  { link: "#", icon: LogOut, title: "Log Out" },
];

export function Account() {
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
