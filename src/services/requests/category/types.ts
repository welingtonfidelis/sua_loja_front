import { Category } from "../../../domains/category";

// Request
export interface GetCategoriesPayload {
  page: number;
  limit?: number;
  filter_by_id?: string;
  filter_by_name?: string;
}

export interface GetCategoryByIdPayload {
  id?: number;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  id: number;
  data: {
    name?: string;
  };
}

// Response
export interface GetCategoriesResponse {
  total: number;
  categories: Category[];
}

export interface GetCategoryResponse extends Category {}


export interface CreateCategoryResponse {
  id: number;
}
