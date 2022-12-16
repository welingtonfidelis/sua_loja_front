import { ProductVariation } from "./productVariation";

export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  is_active: boolean;
  variation: ProductVariation[];
  company_id: number;
  category_id: number;
}
