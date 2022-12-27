import { Category } from "../../../domains/category";

// Request
export interface GetClientCompaniesPayload {
  page: number;
  limit?: number;
  filter_by_name?: string;
}

// Response
export interface GetClientCompaniesResponse {
  total: number;
  companies: { name: string; name_key: string }[];
}
