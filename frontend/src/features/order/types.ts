import { PaginatedResponse } from "@/app/lib";
import { Product } from "../product";
import { ORDER_STATUS } from "./constants";

export type CartItem = Product & { count: number };

export type OrderResponse = {
  id: number;
  date: string;
  status: ORDER_STATUS;
  total_cost: number;
};

export type OrderItemResponse = {
  id: number;
  order_id: number;
  name: string;
  description: string;
  category: string;
  cost: number;
  quantity: number;
};

export type OrdersCountResponse = {
  orders_count: number;
};

export type PaginatedOrdersResponse = PaginatedResponse<OrderResponse[]>;
