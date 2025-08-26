import { Routes } from "./types";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZES: Readonly<number[]> = [10, 25, 50];

export enum QUERY_KEYS {
  ORDERS = "orders",
  SUPPLIERS = "suppliers",
}

export const ROUTES = {
  workspace: {
    dashboard: "/dashboard",
    orders: {
      root: "/orders",
      cart: "/orders/cart",
    },
    inventory: "/inventory",
    products: {
      root: "/products",
      favorite: "/products/favorite",
    },
    suppliers: {
      root: "/suppliers",
      create: "/suppliers/create",
    },
  },
  settings: "/settings",
} satisfies Routes;

export enum SEARCH_PARAMS_KEYS {
  ITEMS_PER_PAGE = "items_per_page",
  PAGE = "page",
}
