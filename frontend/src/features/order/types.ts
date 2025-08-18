import { PaginatedResponse } from "@/app/lib";
import { Product } from "../catalog";
import { ORDER_STATUS } from "./constants";

type CartItem = Product & { count: number };

type OrderResponse = {
  id: number;
  supplier_name: string;
  date: string;
  status: ORDER_STATUS;
  total_cost: number;
};

type OrdersCountResponse = {
  orders_count: number;
};

type PaginatedOrdersResponse = PaginatedResponse<OrderResponse[]>;

export type {
  CartItem,
  OrderResponse,
  OrdersCountResponse,
  PaginatedOrdersResponse,
};
