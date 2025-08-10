import { ROUTES } from "@/app/routes";
import { LogOut, Settings } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui";
import { SidebarItem } from "./AppSidebar";
import { AppSidebarItem } from "./AppSidebarItem";

const items: SidebarItem[] = [
  { link: ROUTES.settings, icon: <Settings />, title: "Settings" },
  { link: "#", icon: <LogOut />, title: "Log Out" },
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
