import { Routes } from "../types";

export const BASE_API_URL = "http://127.0.0.1:3000/api/v1";

export const ENDPOINTS = {
  inventory_items: "/inventory-items",
  orders: "/orders",
  suppliers: "/suppliers",
} satisfies Routes;

export enum HTTP_CODES {
  NOT_FOUND = 404,
}
