import { ROUTES } from "@/app/routes";
import { Path } from "@/app/types";
import { create } from "zustand";

type ActiveSidebarRouteStore = {
  activeSidebarRoute: Path;
  setActiveSidebarRoute: (value: Path) => void;
};

const INITIAL_ACTIVE_ROUTE = ROUTES.workspace.dashboard;

export const useActiveSidebarRouteStore = create<ActiveSidebarRouteStore>(
  (set) => ({
    activeSidebarRoute: INITIAL_ACTIVE_ROUTE,
    setActiveSidebarRoute: (value) => set({ activeSidebarRoute: value }),
  })
);
