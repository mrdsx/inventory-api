import { Routes } from "./types";

export const ROUTES = {
  workspace: {
    dashboard: "/dashboard",
    orders: "/orders",
    products: "/products",
    suppliers: "/suppliers",
  },
  settings: "/settings",
} satisfies Routes;

export enum QUERY_KEYS {
  ORDERS = "orders",
}
