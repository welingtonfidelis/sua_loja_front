import { useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import {
  getClientCompanies,
  getClientCompanyProfile,
  getClientCategories,
} from "./apiRequests";
import {
  GetClientCategoriesPayload,
  GetClientCompanyProfilePayload,
} from "./types";

const { LIST_COMPANIES, LIST_CATEGORIES, LIST_COMPANY_PROFILE, LIST_PRODUCTS } =
  EndPoints.CLIENTS;

// ===== MUTATES ===== //

// ===== QUERIES ===== //
export const useGetClientCompanyOptionsFormat = () => {
  const getQueryKey = () => [LIST_COMPANIES];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getClientCompanies({ page: 1, limit: 100 })
  );

  const options = data?.companies.map((item) => ({
    label: item.name,
    value: item.name_key,
  }));

  return { getQueryKey, refetch, data: options, isLoading, error };
};

export const useGetClientCompanyProfile = (
  params: GetClientCompanyProfilePayload
) => {
  const getQueryKey = () => [LIST_COMPANY_PROFILE];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getClientCompanyProfile(params)
  );

  return { getQueryKey, refetch, data, isLoading, error };
};

export const useGetClientCategoryOptionsFormat = (company_name_key: string) => {
  const getQueryKey = () => [LIST_CATEGORIES];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getClientCategories({ page: 1, limit: 100, company_name_key })
  );

  const options = data?.categories.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return { getQueryKey, refetch, data: options, isLoading, error };
};
