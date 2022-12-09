import { useMutation, useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import { createCompany, getCompanies, getCompanyById, getCompanyUsers, getProfile, updateCompany, updateCompanyUser } from "./apiRequests";
import { GetCompanyByIdPayload, GetCopmaniesPayload, GetCopmanyUsersPayload } from "./types";

const { PROFILE, GET, LIST, USERS_LIST } = EndPoints.COMPANIES;

// ===== MUTATES ===== //
export const useCreateCompany = () => {
  const { mutate, isLoading } = useMutation(createCompany);

  return { createCompany: mutate, isLoading };
};

export const useUpdateCompany = () => {
  const { mutate, isLoading } = useMutation(updateCompany);

  return { updateCompany: mutate, isLoading };
};

export const useUpdateCompanyUser = () => {
  const { mutate, isLoading } = useMutation(updateCompanyUser);

  return { updateCompanyUser: mutate, isLoading };
};

// ===== QUERIES ===== //
export const useGetProfile = () => {
  const getQueryKey = () => [PROFILE];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), getProfile);

  if (data && data.image_url.length)
    data.image_url += `?${new Date().getTime()}`;

  return { getQueryKey, refetch, data, isLoading };
};

export const useGetCompanies = (params: GetCopmaniesPayload) => {
  if (!params.filter_by_id) delete params.filter_by_id;
  if (!params.filter_by_name) delete params.filter_by_name;

  const getQueryKey = () => [LIST, params];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getCompanies(params)
  );

  return { getQueryKey, refetch, data, isLoading, error };
};

export const useGetCompanyById = (params: GetCompanyByIdPayload) => {
  const getQueryKey = () => [GET, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getCompanyById(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};

export const useGetCompanyUsers = (params: GetCopmanyUsersPayload) => {
  if (!params.filter_by_user_id) delete params.filter_by_user_id;
  if (!params.filter_by_user_name) delete params.filter_by_user_name;
  if (!params.filter_by_company_id) delete params.filter_by_company_id;
  if (!params.filter_by_company_name) delete params.filter_by_company_name;

  const getQueryKey = () => [USERS_LIST, params];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getCompanyUsers(params)
  );

  return { getQueryKey, refetch, data, isLoading, error };
};