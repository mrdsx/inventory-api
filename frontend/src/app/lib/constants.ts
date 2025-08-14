import { Routes } from "./types";

export const PAGE_SIZE = 10;

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
  ITEMS_PER_PAGE: "items-per-page",
  PAGE: "page",
} as const;

export enum QUERY_KEYS {
  ORDERS = "orders",
}
