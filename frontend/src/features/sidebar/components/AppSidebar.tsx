import { Sidebar, SidebarContent, SidebarSeparator } from "@/components/ui";
import { Account } from "./Account";
import { AppSidebarFooter } from "./AppSidebarFooter";
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
      <AppSidebarFooter />
    </Sidebar>
  );
}
