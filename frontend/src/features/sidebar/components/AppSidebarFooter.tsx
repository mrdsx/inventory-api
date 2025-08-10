import { SidebarFooter } from "@/components/ui";
import { ToggleThemeBtn } from "@/features/theme";

export function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <ToggleThemeBtn className="hover:bg-sidebar-accent" size="icon" />
    </SidebarFooter>
  );
}
