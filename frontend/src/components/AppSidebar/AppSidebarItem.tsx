"use client";
import { SidebarMenuButton, SidebarMenuItem } from "../ui";
import { SidebarItem } from "./AppSidebar";

export function AppSidebarItem({ item }: { item: SidebarItem }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={item.link}>
          {item.icon}
          {item.title}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
