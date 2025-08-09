import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui";
import { ToggleThemeBtn } from "@/features/theme";
import { Component as LucideIcon } from "lucide-react";
import { Actions } from "./Actions";
import { Navigation } from "./Navigation";

export type MenuItem = {
  link: string;
  icon: typeof LucideIcon;
  title: string;
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="ml-2 mt-2">Inventory API</h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <Navigation />
        <SidebarSeparator />
        <Actions />
      </SidebarContent>
      <SidebarFooter>
        <ToggleThemeBtn />
      </SidebarFooter>
    </Sidebar>
  );
}
