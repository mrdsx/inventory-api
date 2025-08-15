import { ROUTES } from "@/app/lib";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui";
import { SidebarItem } from "@/features/sidebar";
import { LogOut, Settings } from "lucide-react";
import { AppSidebarItem } from "./AppSidebarItem";

const items: SidebarItem[] = [
  { link: ROUTES.settings, icon: <Settings />, title: "Settings" },
  { link: "/logout", icon: <LogOut />, title: "Log Out" },
];

export function Account() {
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
