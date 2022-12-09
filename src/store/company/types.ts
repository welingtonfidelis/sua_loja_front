import { Company } from "../../domains/company";

export type State = { company: Company };

export type Action = {
  updateCompany: (data: Partial<Company>) => void;
  clearCompany: () => void;
};
