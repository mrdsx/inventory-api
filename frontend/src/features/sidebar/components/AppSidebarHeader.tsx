"use client";
import { SidebarHeader, useSidebar } from "@/components/ui";
import { Webhook } from "lucide-react";

export function AppSidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className={`${isCollapsed && "items-center"}`}>
      {isCollapsed && <Webhook />}
      {!isCollapsed && <h1 className="text-lg">Inventory API</h1>}
    </SidebarHeader>
  );
}
