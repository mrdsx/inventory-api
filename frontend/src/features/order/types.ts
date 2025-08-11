import { ORDER_STATUS } from "./constants";

export type OrderResponse = {
  id: number;
  supplier_name: string;
  date: string;
  status: ORDER_STATUS;
  total_cost: number;
};
