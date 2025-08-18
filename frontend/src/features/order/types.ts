import { PaginatedResponse } from "@/app/lib";
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

type Product = {
  id: number;
  name: string;
  supplier: string;
  description: string;
  category: string;
  cost: number;
};

export type {
  CartItem,
  OrderResponse,
  OrdersCountResponse,
  PaginatedOrdersResponse,
  Product,
};
