export const FiltersType = {
  PAGE: 'page',
  FILTER_BY_USER_ID: 'filter_by_user_id',
  FILTER_BY_USER_NAME: 'filter_by_user_name',
  FILTER_BY_COMPANY_ID: 'filter_by_company_id',
  FILTER_BY_COMPANY_NAME: 'filter_by_company_name',
}

export type State = {
  filters: {
    page: number;
    filter_by_user_id: string;
    filter_by_user_name: string;
    filter_by_company_id: string;
    filter_by_company_name: string;
  };
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterByUserId: (data: string) => void;
  updateFilterByUserName: (data: string) => void;
  updateFilterByCompanyId: (data: string) => void;
  updateFilterByCompanyName: (data: string) => void;
  // updateFilterByKey: (key: string, value: string | number) => void;
};
