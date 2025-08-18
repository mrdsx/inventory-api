type Product = {
  id: number;
  name: string;
  supplier: string;
  description: string;
  category: string;
  cost: number;
};

type ProductGroupBy = "category" | "supplier";
type ProductView = "grid" | "rows";

export type { Product, ProductGroupBy, ProductView };
