"use client";
import { SidebarFooter, useSidebar } from "@/components/ui";
import { ToggleThemeBtn } from "@/features/theme";

export function AppSidebarFooter() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarFooter className={`${isCollapsed && "items-center"}`}>
      <ToggleThemeBtn className="hover:bg-sidebar-accent" size="icon" />
    </SidebarFooter>
  );
}
