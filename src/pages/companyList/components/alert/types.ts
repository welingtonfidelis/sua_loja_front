import { QueryKey } from "react-query";
import { Company } from "../../../../domains/company";

export interface Props {
  isOpenBlock: boolean;
  onCloseBlock: () => void;

  selectedCompany: Company | null;
  queryKey: QueryKey;
}
