import { ORDER_STATUS } from "./constants";

export interface OrderResponse {
  id: number;
  supplier_name: string;
  date: string;
  status: ORDER_STATUS;
  total_cost: number;
}

export interface OrdersCountResponse {
  orders_count: number;
}
