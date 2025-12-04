// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  producer: string;
  unitPrice: number;
  unit: string;
  quantity: number;
  imageUrl: string;
}

// Cart state interface
export interface CartState {
  items: CartItem[];
  total: number;
}

// Cart action types
export type QuantityOperation = 'increment' | 'decrement';
export type CartActionType = 'continue' | 'checkout';