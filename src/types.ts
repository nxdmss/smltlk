export type Screen = 'locations' | 'menu' | 'cart' | 'checkout' | 'success';

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
