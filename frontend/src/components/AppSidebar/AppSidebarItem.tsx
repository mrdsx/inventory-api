"use client";
import { SidebarItem } from "@/features/sidebar";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui";

export function AppSidebarItem({ item }: { item: SidebarItem }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={item.link}>
          {item.icon}
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
