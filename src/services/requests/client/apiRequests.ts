import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import { GetClientCompaniesPayload, GetClientCompaniesResponse } from "./types";

const { LIST_COMPANIES } = EndPoints.CLIENTS;

// ===== MUTATES ===== //

// ===== QUERIES ===== //
export const getClientCompanies = async (params: GetClientCompaniesPayload) => {
  const { data: response } =
    await RestRequestService.get<GetClientCompaniesResponse>(LIST_COMPANIES, {
      params: { ...params, limit: params.limit || 100 },
    });
  return response;
};
