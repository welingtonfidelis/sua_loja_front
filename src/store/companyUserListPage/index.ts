import { create } from "zustand";
import { State, Action, FiltersType } from "./types";

const initiaState = {
  filters: {
    page: 1,
    filter_by_user_id: "",
    filter_by_user_name: "",
    filter_by_company_id: "",
    filter_by_company_name: "",
  }
};

export const companyUserListPageStore = create<State & Action>((set) => ({
  ...initiaState,

  updatePageNumber: (data) => {
    return set((state) => ({ filters: { ...state.filters, page: data } }));
  },
  updateFilterByUserId: (data) => {
    return set((state) => {
      const page = state.filters.filter_by_user_id ? state.filters.page : 1;
      const filters = {
        filters: { ...state.filters, page, filter_by_user_id: data },
      };

      return filters;
    });
  },
  updateFilterByUserName: (data) => {
    return set((state) => {
      const page = state.filters.filter_by_user_name ? state.filters.page : 1;
      const filters = {
        filters: { ...state.filters, page, filter_by_user_name: data },
      };

      return filters;
    });
  },
  updateFilterByCompanyId: (data) => {
    return set((state) => {
      const page = state.filters.filter_by_company_id ? state.filters.page : 1;
      const filters = {
        filters: { ...state.filters, page, filter_by_company_id: data },
      };

      return filters;
    });
  },
  updateFilterByCompanyName: (data) => {
    return set((state) => {
      const page = state.filters.filter_by_company_name ? state.filters.page : 1;
      const filters = {
        filters: { ...state.filters, page, filter_by_company_name: data },
      };

      return filters;
    });
  },
}));
