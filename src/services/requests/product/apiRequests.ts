import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import {
  CreateProductPayload,
  CreateProductResponse,
  GetProductsPayload,
  GetProductByIdPayload,
  GetProductResponse,
  GetProductsResponse,
  UpdateProductPayload,
} from "./types";

const { LIST, GET, UPDATE, CREATE } = EndPoints.PRODUCTS;

// ===== MUTATES ===== //
export const createProduct = async (payload: CreateProductPayload) => {
  const { data: response } =
    await RestRequestService.post<CreateProductResponse>(CREATE, payload);
  return response;
};

export const updateProduct = async (payload: UpdateProductPayload) => {
  const { id, data } = payload;

  const { data: response } = await RestRequestService.patch<{}>(
    UPDATE.replace(":id", String(id)),
    data
  );
  return response;
};

// ===== QUERIES ===== //
export const getProducts = async (params: GetProductsPayload) => {
  const { data: response } = await RestRequestService.get<GetProductsResponse>(
    LIST,
    { params: { ...params, limit: 20 } }
  );
  return response;
};

export const getProductById = async (params: GetProductByIdPayload) => {
  const { id } = params;

  if (!id) return;

  const { data: response } = await RestRequestService.get<GetProductResponse>(
    GET.replace(":id", String(id))
  );
  return response;
};
