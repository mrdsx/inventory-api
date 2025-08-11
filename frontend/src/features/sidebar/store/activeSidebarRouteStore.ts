import { ROUTES } from "@/app/lib/constants";
import { Path } from "@/app/lib/types";
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
  }),
);
