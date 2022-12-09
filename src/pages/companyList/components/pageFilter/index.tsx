import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { ApplicationRoutes } from "../../../../shared/enum/applicationRoutes";
import { SearchInputContent } from "./styles";
import { companyListPageStore } from "../../../../store/companyListPage";

const { COMPANY_NEW } = ApplicationRoutes;

export const PageFilter = () => {
  const { filters, updateFilterById, updateFilterByName } = companyListPageStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <SearchInputContent>
        <DebounceInput
          debounceTimeout={500}
          placeholder={t("pages.company_list.input_search_id")}
          type="number"
          marginEnd={3}
          maxWidth={40}
          value={filters.filter_by_id}
          onChange={(e) => updateFilterById(e.target.value)}
          element={(field: any) => <Input {...field} />}
        />

        <DebounceInput
          debounceTimeout={500}
          placeholder={t("pages.company_list.input_search_name")}
          marginEnd={3}
          value={filters.filter_by_name}
          onChange={(e) => updateFilterByName(e.target.value)}
          element={(field: any) => <Input {...field} />}
        />
        <Button
          minWidth={32}
          colorScheme="blue"
          onClick={() => navigate(COMPANY_NEW)}
        >
          {t("pages.company_list.button_new_company")}
        </Button>
      </SearchInputContent>
    </>
  );
};
