import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import {
  CreateCategoryPayload,
  CreateCategoryResponse,
  GetCategoriesPayload,
  GetCategoryByIdPayload,
  GetCategoryResponse,
  GetCategoriesResponse,
  UpdateCategoryPayload,
} from "./types";

const { LIST, GET, UPDATE, CREATE } = EndPoints.CATEGORIES;

// ===== MUTATES ===== //
export const createCategory = async (payload: CreateCategoryPayload) => {
  const { data: response } =
    await RestRequestService.post<CreateCategoryResponse>(CREATE, payload);
  return response;
};

export const updateCategory = async (payload: UpdateCategoryPayload) => {
  const { id, data } = payload;

  const { data: response } = await RestRequestService.patch<{}>(
    UPDATE.replace(":id", String(id)),
    data
  );
  return response;
};

// ===== QUERIES ===== //
export const getCategories = async (params: GetCategoriesPayload) => {
  const { data: response } = await RestRequestService.get<GetCategoriesResponse>(
    LIST,
    { params: { ...params, limit: 20 } }
  );
  return response;
};

export const getCategoryById = async (params: GetCategoryByIdPayload) => {
  const { id } = params;

  if (!id) return;

  const { data: response } = await RestRequestService.get<GetCategoryResponse>(
    GET.replace(":id", String(id))
  );
  return response;
};
