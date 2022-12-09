import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import {
  CreateCompanyPayload,
  CreateCompanyResponse,
  GetCompaniesResponse,
  GetCompanyByIdPayload,
  GetCompanyResponse,
  GetCompanyUserResponse,
  GetCopmaniesPayload,
  GetProfileResponse,
  UpdateCompanyPayload,
  UpdateCompanyUserPayload,
} from "./types";

const { PROFILE, LIST, GET, UPDATE, CREATE, USERS_LIST, USER_UPDATE } =
  EndPoints.COMPANIES;

// ===== MUTATES ===== //
export const createCompany = async (payload: CreateCompanyPayload) => {
  const { data: response } =
    await RestRequestService.post<CreateCompanyResponse>(CREATE, payload);
  return response;
};

export const updateCompany = async (payload: UpdateCompanyPayload) => {
  const { id, data } = payload;

  const { data: response } = await RestRequestService.patch<{}>(
    UPDATE.replace(":id", String(id)),
    data
  );
  return response;
};

export const updateCompanyUser = async (payload: UpdateCompanyUserPayload) => {
  const { id, data } = payload;

  const { data: response } = await RestRequestService.patch<{}>(
    USER_UPDATE.replace(":id", String(id)),
    data
  );
  return response;
};

// ===== QUERIES ===== //
export const getProfile = async () => {
  const { data: response } = await RestRequestService.get<GetProfileResponse>(
    PROFILE
  );
  return response;
};

export const getCompanies = async (params: GetCopmaniesPayload) => {
  const { data: response } = await RestRequestService.get<GetCompaniesResponse>(
    LIST,
    { params: { ...params, limit: 20 } }
  );
  return response;
};

export const getCompanyById = async (params: GetCompanyByIdPayload) => {
  const { id } = params;

  if (!id) return;

  const { data: response } = await RestRequestService.get<GetCompanyResponse>(
    GET.replace(":id", String(id))
  );
  return response;
};

export const getCompanyUsers = async (params: GetCopmaniesPayload) => {
  const { data: response } =
    await RestRequestService.get<GetCompanyUserResponse>(USERS_LIST, {
      params: { ...params, limit: 20 },
    });
  return response;
};
