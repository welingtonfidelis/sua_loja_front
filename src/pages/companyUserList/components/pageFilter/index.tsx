import { DebounceInput } from "react-debounce-input";
import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { InputContainer, SearchInputContent } from "./styles";
import { companyUserListPageStore } from "../../../../store/companyUserListPage";

export const PageFilter = () => {
  const {
    filters,
    updateFilterByUserId,
    updateFilterByUserName,
    updateFilterByCompanyId,
    updateFilterByCompanyName,
  } = companyUserListPageStore();
  const { t } = useTranslation();

  return (
    <>
      <SearchInputContent>
        <InputContainer isFirst={true}>
          <DebounceInput
            debounceTimeout={500}
            placeholder={t("pages.company_user_list.input_search_user_id")}
            type="number"
            marginEnd={3}
            maxWidth={40}
            value={filters.filter_by_user_id}
            onChange={(e) => updateFilterByUserId(e.target.value)}
            element={(field: any) => <Input {...field} />}
          />
          <DebounceInput
            debounceTimeout={500}
            placeholder={t("pages.company_user_list.input_search_user_name")}
            value={filters.filter_by_user_name}
            onChange={(e) => updateFilterByUserName(e.target.value)}
            element={(field: any) => <Input {...field} />}
          />
        </InputContainer>

        <InputContainer>
          <DebounceInput
            debounceTimeout={500}
            placeholder={t("pages.company_user_list.input_search_company_id")}
            type="number"
            marginEnd={3}
            maxWidth={40}
            value={filters.filter_by_company_id}
            onChange={(e) => updateFilterByCompanyId(e.target.value)}
            element={(field: any) => <Input {...field} />}
          />
          <DebounceInput
            debounceTimeout={500}
            placeholder={t("pages.company_user_list.input_search_company_name")}
            value={filters.filter_by_company_name}
            onChange={(e) => updateFilterByCompanyName(e.target.value)}
            element={(field: any) => <Input {...field} />}
          />
        </InputContainer>
      </SearchInputContent>
    </>
  );
};
