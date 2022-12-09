export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  is_active: boolean;
  variation_1: string[];
  variation_2: string[];
  company_id: number;
  category_id: number;
}
