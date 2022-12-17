import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Select as SelectSearch } from "chakra-react-select";

import { ApplicationRoutes } from "../../../../shared/enum/applicationRoutes";
import { InputContainer, SearchInputContent, SelectContainer } from "./styles";
import { companyListPageStore } from "../../../../store/companyListPage";
import { useGetCategoryOptionsFormat } from "../../../../services/requests/category";
import { productListPageStore } from "../../../../store/productListPage";

const { PRODUCT_NEW } = ApplicationRoutes;

export const PageFilter = () => {
  const { isLoading: isLoadingGetCategories, data: categoryOptions } =
    useGetCategoryOptionsFormat();
  const {
    filters,
    updateFilterById,
    updateFilterByName,
    updateFilterByCategoryId,
  } = productListPageStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <SearchInputContent>
        <SelectContainer>
          <SelectSearch
            isLoading={isLoadingGetCategories}
            onChange={(e) =>
              updateFilterByCategoryId(e.map((item) => item?.value ?? 0))
            }
            value={(filters.filter_by_category_id || []).map((item) =>
              categoryOptions?.find((subItem) => subItem.value === item)
            )}
            options={categoryOptions}
            isMulti
            placeholder={t("pages.product_list.input_search_category_id")}
          />

          <Button
            minWidth={32}
            ml={3}
            colorScheme="blue"
            onClick={() => navigate(PRODUCT_NEW)}
          >
            {t("pages.product_list.button_new_product")}
          </Button>
        </SelectContainer>

        <InputContainer>
          <DebounceInput
            debounceTimeout={500}
            placeholder={t("pages.product_list.input_search_id")}
            type="number"
            marginEnd={3}
            maxWidth={40}
            value={filters.filter_by_id}
            onChange={(e) => updateFilterById(e.target.value)}
            element={(field: any) => <Input {...field} />}
          />

          <DebounceInput
            debounceTimeout={500}
            placeholder={t("pages.product_list.input_search_name")}
            value={filters.filter_by_name}
            onChange={(e) => updateFilterByName(e.target.value)}
            element={(field: any) => <Input {...field} />}
          />
        </InputContainer>
      </SearchInputContent>
    </>
  );
};
