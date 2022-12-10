import { useMutation, useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./apiRequests";
import { GetProductsPayload, GetProductByIdPayload } from "./types";

const { GET, LIST } = EndPoints.PRODUCTS;

// ===== MUTATES ===== //
export const useCreateProduct = () => {
  const { mutate, isLoading } = useMutation(createProduct);

  return { createProduct: mutate, isLoading };
};

export const useUpdateProduct = () => {
  const { mutate, isLoading } = useMutation(updateProduct);

  return { updateProduct: mutate, isLoading };
};

// ===== QUERIES ===== //
export const useGetProducts = (params: GetProductsPayload) => {
  if (!params.filter_by_id) delete params.filter_by_id;
  if (!params.filter_by_name) delete params.filter_by_name;
  if (!params.filter_by_category_id) delete params.filter_by_category_id;

  const getQueryKey = () => [LIST, params];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getProducts(params)
  );

  return { getQueryKey, refetch, data, isLoading, error };
};

export const useGetProductById = (params: GetProductByIdPayload) => {
  const getQueryKey = () => [GET, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getProductById(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};
