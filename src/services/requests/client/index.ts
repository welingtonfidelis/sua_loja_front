import { useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import {
  getClientCompanies
} from "./apiRequests";

const { LIST_COMPANIES } = EndPoints.CLIENTS;

// ===== MUTATES ===== //

// ===== QUERIES ===== //
export const useGetClientCompanyOptionsFormat = () => {
  const getQueryKey = () => [LIST_COMPANIES, "client_company_options_format"];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getClientCompanies({ page: 1, limit: 100 })
  );

  const options = data?.companies.map((item) => ({ label: item.name, value: item.name_key }));

  return { getQueryKey, refetch, data: options, isLoading, error };
};
