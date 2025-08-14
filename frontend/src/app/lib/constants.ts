import { Routes } from "./types";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZES: Readonly<string[]> = ["10", "25", "50"];

export const ROUTES = {
  workspace: {
    dashboard: "/dashboard",
    orders: "/orders",
    products: "/products",
    suppliers: "/suppliers",
  },
  settings: "/settings",
} satisfies Routes;

export const SEARCH_PARAMS_KEYS = {
  ITEMS_PER_PAGE: "items_per_page",
  PAGE: "page",
} as const;

export enum QUERY_KEYS {
  ORDERS = "orders",
}
