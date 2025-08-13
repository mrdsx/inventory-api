"use client";

import { Path } from "@/app/lib";
import { SidebarHeader, useSidebar } from "@/components/ui";
import { Webhook } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useActiveSidebarRouteStore } from "../store/activeSidebarRouteStore";

export function AppSidebarHeader() {
  const { setActiveSidebarRoute } = useActiveSidebarRouteStore();
  const pathname = usePathname() as Path;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => setActiveSidebarRoute(pathname), []);

  return (
    <SidebarHeader>
      {isCollapsed && <Webhook />}
      {!isCollapsed && <span className="text-lg">Inventory API</span>}
    </SidebarHeader>
  );
}
