import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import {
  GetClientCategoriesPayload,
  GetClientCategoriesResponse,
  GetClientCompaniesPayload,
  GetClientCompaniesResponse,
  GetClientCompanyProfilePayload,
  GetClientCompanyProfileResponse,
} from "./types";

const { LIST_COMPANIES, LIST_CATEGORIES, LIST_COMPANY_PROFILE, LIST_PRODUCTS } =
  EndPoints.CLIENTS;

// ===== MUTATES ===== //

// ===== QUERIES ===== //
export const getClientCompanies = async (params: GetClientCompaniesPayload) => {
  const { data: response } =
    await RestRequestService.get<GetClientCompaniesResponse>(LIST_COMPANIES, {
      params: { ...params, limit: params.limit || 100 },
    });
  return response;
};

export const getClientCompanyProfile = async (
  params: GetClientCompanyProfilePayload
) => {
  const { data: response } =
    await RestRequestService.get<GetClientCompanyProfileResponse>(
      LIST_COMPANY_PROFILE,
      {
        params,
      }
    );
  return response;
};

export const getClientCategories = async (params: GetClientCategoriesPayload) => {
  const { data: response } =
    await RestRequestService.get<GetClientCategoriesResponse>(LIST_CATEGORIES, {
      params: { ...params, limit: params.limit || 100 },
    });
  return response;
};