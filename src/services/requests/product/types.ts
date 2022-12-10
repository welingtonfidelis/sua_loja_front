import { Product } from "../../../domains/product";

// Request
export interface GetProductsPayload {
  page: number;
  filter_by_id?: string;
  filter_by_category_id?: string;
  filter_by_name?: string;
}

export interface GetProductByIdPayload {
  id?: number;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  quantity: number;
  is_active: boolean;
  variation_1: string[];
  variation_2: string[];
  category_id: number;
}

export interface UpdateProductPayload {
  id: number;
  data: {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    is_active?: boolean;
    variation_1?: string[];
    variation_2?: string[];
    category_id?: number;
  };
}

// Response
export interface GetProductsResponse {
  total: number;
  products: Product[];
}

export interface GetProductResponse extends Product {}


export interface CreateProductResponse {
  id: number;
}
