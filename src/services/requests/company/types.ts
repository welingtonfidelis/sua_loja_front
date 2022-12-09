import { Company } from "../../../domains/company";
import { User } from "../../../domains/user";

// Request
export interface GetCopmaniesPayload {
  page: number;
  filter_by_id?: string;
  filter_by_name?: string;
}

export interface GetCompanyByIdPayload {
  id?: number;
}

export interface CreateCompanyPayload {
  name: string;
  email: string;
  phone: string;
  is_blocked: boolean;
}

export interface UpdateCompanyPayload {
  id: number;
  data: {
    name?: string;
    email?: string;
    phone?: string;
    is_blocked?: boolean;
  };
}

export interface GetCopmanyUsersPayload {
  page: number;
  filter_by_user_id?: string;
  filter_by_user_name?: string;
  filter_by_company_id?: string;
  filter_by_company_name?: string;
}

export interface UpdateCompanyUserPayload {
  id: number;
  data: {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    is_blocked?: boolean;
    permissions?: string[];
  };
}

// Response
export interface GetProfileResponse extends Company {}

export interface GetCompaniesResponse {
  total: number;
  companies: Company[];
}

export interface GetCompanyResponse extends Company {}


export interface CreateCompanyResponse {
  company_id: number;
  user_id: number;
  email: string;
  password: string;
  username: string;
}

interface UsersWithCompany extends User {
  company: Company;
}

export interface GetCompanyUserResponse { 
  total: number;
  users: UsersWithCompany[];
}