import { Category } from "../../../domains/category";
import { Product } from "../../../domains/product";

// Request
export interface GetClientCompaniesPayload {
  page: number;
  limit?: number;
  filter_by_name?: string;
}

export interface GetClientCompanyProfilePayload {
  company_name_key: string;
}


export interface GetClientCategoriesPayload {
  page: number;
  limit?: number;
  company_name_key: string;
  filter_by_name?: string;
}

export interface GetClientProductsPayload {
  page: number;
  limit?: number;
  company_name_key: string;
  filter_by_name?: string;
  filter_by_category_id?: string[];
}

// Response
export interface GetClientCompaniesResponse {
  total: number;
  companies: { name: string; name_key: string }[];
}

export interface GetClientCompanyProfileResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  image_url: string;
}

export interface GetClientCategoriesResponse {
  total: number;
  categories: Category[];
}

export interface GetClientProductsResponse {
  total: number;
  products: Product[];
}