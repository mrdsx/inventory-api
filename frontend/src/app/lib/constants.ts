import { Routes } from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const PAGE_SIZES: Readonly<number[]> = [10, 25, 50];

enum QUERY_KEYS {
  ORDERS = "orders",
}

const ROUTES = {
  workspace: {
    dashboard: "/dashboard",
    orders: {
      root: "/orders",
      create: "/orders/create",
      cart: "/orders/cart",
    },
    inventory: "/inventory",
    products: {
      root: "/products",
      favorite: "/products/favorite",
    },
    suppliers: "/suppliers",
  },
  settings: "/settings",
} satisfies Routes;

const SEARCH_PARAMS_KEYS = {
  ITEMS_PER_PAGE: "items_per_page",
  PAGE: "page",
} as const;

export {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  QUERY_KEYS,
  ROUTES,
  SEARCH_PARAMS_KEYS,
};
