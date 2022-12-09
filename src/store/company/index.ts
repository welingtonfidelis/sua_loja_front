import create from "zustand";
import { State, Action } from "./types";

const initialCompanyState = {
  id: 0,
  image_url: "",
  name_key: "",
  name: "",
  email: "",
  phone: "",
  is_blocked: false,
};

export const companyStore = create<State & Action>((set) => ({
  company: initialCompanyState,

  updateCompany: (data) =>
    set((state) => {
      return { company: { ...state.company, ...data } };
    }),
  clearCompany: () => set(() => ({ company: initialCompanyState })),
}));
