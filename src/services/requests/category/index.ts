import { useMutation, useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "./apiRequests";
import { GetCategoriesPayload, GetCategoryByIdPayload } from "./types";

const { GET, LIST } = EndPoints.CATEGORIES;

// ===== MUTATES ===== //
export const useCreateCategory = () => {
  const { mutate, isLoading } = useMutation(createCategory);

  return { createCategory: mutate, isLoading };
};

export const useUpdateCategory = () => {
  const { mutate, isLoading } = useMutation(updateCategory);

  return { updateCategory: mutate, isLoading };
};

// ===== QUERIES ===== //
export const useGetCategories = (params: GetCategoriesPayload) => {
  if (!params.filter_by_id) delete params.filter_by_id;
  if (!params.filter_by_name) delete params.filter_by_name;

  const getQueryKey = () => [LIST, params];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getCategories(params)
  );

  return { getQueryKey, refetch, data, isLoading, error };
};

export const useGetCategoryById = (params: GetCategoryByIdPayload) => {
  const getQueryKey = () => [GET, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getCategoryById(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};