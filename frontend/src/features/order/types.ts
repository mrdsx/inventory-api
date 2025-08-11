import { ORDER_STATUS } from "./constants";

export type OrderResponse = {
  id: number;
  supplier_name: string;
  date: string;
  status: ORDER_STATUS;
  total_cost: number;
};

export type OrdersCountResponse = {
  orders_count: number;
};
