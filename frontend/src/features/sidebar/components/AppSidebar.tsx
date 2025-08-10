import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui";
import { ToggleThemeBtn } from "@/features/theme";
import { Account } from "./Account";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { Workspace } from "./Workspace";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSidebarHeader />
      <SidebarSeparator />
      <SidebarContent>
        <Workspace />
        <SidebarSeparator />
        <Account />
      </SidebarContent>
      <SidebarFooter>
        <ToggleThemeBtn className="hover:bg-sidebar-accent" size="icon" />
      </SidebarFooter>
    </Sidebar>
  );
}
