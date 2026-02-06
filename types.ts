
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Accessories';
