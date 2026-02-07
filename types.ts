
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Accessories';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ShippingMethod = 'Standard' | 'Express' | 'Free';
