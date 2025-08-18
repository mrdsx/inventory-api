export type Product = {
  id: number;
  name: string;
  supplier: string;
  description: string;
  category: string;
  cost: number;
};

export type ProductGroupBy = "category" | "supplier";
export type ProductView = "grid" | "rows";
