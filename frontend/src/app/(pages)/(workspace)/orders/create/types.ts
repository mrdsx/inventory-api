type CartItem = Product & { count: number };

type Product = {
  id: number;
  name: string;
  supplier: string;
  description: string;
  category: string;
  cost: number;
};

export type { CartItem, Product };
