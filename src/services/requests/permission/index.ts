import { useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";
import { ApplicationPermissions } from "../../../shared/enum/applicationPermissions";
import { getPermissionList } from "./apiRequests";

const { LIST } = EndPoints.PERMISSIONS;
const { CLIENT } = ApplicationPermissions;

// ===== QUERIES ===== //
export const useGetListPermissions = () => {
  const getQueryKey = () => [LIST];

  const { data, refetch, isLoading } = useQuery(
    getQueryKey(),
    getPermissionList
  );

  const treatedData = (data || []).filter(
    (item) => (item as ApplicationPermissions) !== CLIENT
  );

  return { getQueryKey, refetch, data: treatedData, isLoading };
};
