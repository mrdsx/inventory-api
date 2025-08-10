"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import { SidebarItem, useActiveSidebarRouteStore } from "@/features/sidebar";
import Link from "next/link";

export function AppSidebarItem({ item }: { item: SidebarItem }) {
  const { activeSidebarRoute, setActiveSidebarRoute } =
    useActiveSidebarRouteStore();

  const isActive = item.link == activeSidebarRoute;
  const className = `${
    isActive && "bg-primary text-white hover:bg-primary/80 hover:text-white"
  }`;

  function handleClick(): void {
    if (item.isWorkspaceRoute) setActiveSidebarRoute(item.link);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className={className} onClick={handleClick} asChild>
        <Link href={item.link}>
          {item.icon}
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
