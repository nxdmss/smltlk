export type Screen =
  | 'locations'
  | 'menu'
  | 'cart'
  | 'checkout'
  | 'success';

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  details: string;
  unitPrice: number;
  quantity: number;
};

export type CartSummary = {
  quantity: number;
  total: number;
};

export type OrderStatus = 'готовится' | 'готов';

export type ActiveOrder = {
  id: string;
  status: OrderStatus;
  items: CartItem[];
  quantity: number;
  total: number;
  address: string;
  pickupTime: string;
};
