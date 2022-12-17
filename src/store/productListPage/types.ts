export const FiltersType = {
  PAGE: 'page',
  FILTER_BY_ID: 'filter_by_id',
  FILTER_BY_NAME: 'filter_by_name',
  FILTER_BY_CATEGORY_ID: 'filter_by_category_id',
}

export type State = {
  filters: {
    page: number;
    filter_by_id: string;
    filter_by_name: string;
    filter_by_category_id: number[];
  };
};

export type Action = {
  updatePageNumber: (data: number) => void;
  updateFilterById: (data: string) => void;
  updateFilterByName: (data: string) => void;
  updateFilterByCategoryId: (data: number[]) => void;
  // updateFilterByKey: (key: string, value: string | number) => void;
};
