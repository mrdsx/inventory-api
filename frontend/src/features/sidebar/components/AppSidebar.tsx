import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui";
import { ToggleThemeBtn } from "@/features/theme";
import { AccountSidebarGroup } from "./AccountSidebarGroup";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { WorkspaceSidebarGroup } from "./WorkspaceSidebarGroup";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSidebarHeader />
      <SidebarSeparator />
      <SidebarContent>
        <WorkspaceSidebarGroup />
        <SidebarSeparator />
        <AccountSidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <ToggleThemeBtn size="icon" />
      </SidebarFooter>
    </Sidebar>
  );
}
