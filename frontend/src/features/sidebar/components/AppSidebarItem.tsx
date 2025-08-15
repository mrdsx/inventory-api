"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import { SidebarItem } from "@/features/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebarItem({ item }: { item: SidebarItem }) {
  const pathname = usePathname();

  const isActive = pathname.includes(item.link);
  const className = `${
    isActive && "bg-primary text-white hover:bg-primary/80 hover:text-white"
  }`;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className={className} asChild>
        <Link href={item.link}>
          {item.icon}
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
