import { ROUTES } from "@/app/lib";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui";
import { SidebarItem } from "@/features/sidebar";
import {
  ChartLine,
  ClipboardList,
  ListChecks,
  Package,
  Users,
} from "lucide-react";
import { AppSidebarItem } from "./AppSidebarItem";

const { workspace } = ROUTES;
const items: SidebarItem[] = [
  {
    link: workspace.dashboard,
    icon: <ChartLine />,
    title: "Dashboard",
  },
  {
    link: workspace.inventory,
    icon: <ClipboardList />,
    title: "Inventory",
  },
  {
    link: workspace.products.root,
    icon: <Package />,
    title: "Products",
  },
  {
    link: workspace.orders.root,
    icon: <ListChecks />,
    title: "Orders",
  },
  {
    link: workspace.suppliers,
    icon: <Users />,
    title: "Suppliers",
  },
];

export function WorkspaceSidebarGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <AppSidebarItem item={item} key={item.title} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
