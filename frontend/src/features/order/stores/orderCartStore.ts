import { Product } from "@/features/product";
import { create } from "zustand";
import { CartItem } from "../types";

interface OrderCartState {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  getCartItemCount: (itemId: number) => number;
  getCartTotalCost: () => number;
  removeItemFromCart: (itemId: number) => void;
  removeOneFromCart: (itemId: number) => void;
}

export const useOrderCartStore = create<OrderCartState>((set, get) => ({
  cart: [],
  getCartItemCount: (itemId: number) => {
    const cartItem = get().cart.find((i) => i.id === itemId);
    return cartItem?.count ?? 0;
  },
  getCartTotalCost: () => {
    return get().cart.reduce((sum, item) => sum + item.cost * item.count, 0);
  },
  addToCart: (item: Product) => {
    const { cart } = get();
    let nextCart;

    const existing = cart.find((i) => i.id === item.id);
    if (existing === undefined) {
      nextCart = [...cart, { ...item, count: 1 }];
    } else {
      nextCart = cart.map((i) =>
        i.id === item.id ? { ...i, count: i.count + 1 } : i,
      );
    }
    set({ cart: nextCart });
  },
  removeItemFromCart: (itemId: number) => {
    const { cart } = get();

    const existing = cart.find((i) => i.id === itemId);
    if (existing === undefined) return;

    const nextCart = cart.filter((i) => i.id !== itemId);
    set({ cart: nextCart });
  },
  removeOneFromCart: (itemId: number) => {
    const { cart } = get();
    let nextCart;

    const existing = cart.find((i) => i.id === itemId);
    if (existing === undefined) return;

    if (existing.count <= 1) {
      nextCart = cart.filter((i) => i.id !== itemId);
    } else {
      nextCart = cart.map((i) =>
        i.id === itemId ? { ...i, count: i.count - 1 } : i,
      );
    }
    set({ cart: nextCart });
  },
}));
