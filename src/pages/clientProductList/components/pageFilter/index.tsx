import { useState } from "react";
import { Button, Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { useGetClientCategoryOptionsFormat } from "../../../../services/requests/client";
import { clientProductListPageStore } from "../../../../store/clientProductListPage";
import { Props } from "./types";
import { Preloader } from "../../../../components/preloader";

export const PageFilter = (props: Props) => {
  const { company_name_key } = props;
  const [selectedCategories, setSelectedCategories] = useState<
    (string | number)[]
  >([]);
  const { data: categoryOptions, isLoading: categoryOptionsIsLoading } =
    useGetClientCategoryOptionsFormat(company_name_key);
  const { updateFilterByCategoryId } = clientProductListPageStore();

  const handleChangeFilter = () => {
    updateFilterByCategoryId(selectedCategories as number[]);
  };

  return (
    <Preloader isLoading={categoryOptionsIsLoading}>
      <CheckboxGroup
        onChange={setSelectedCategories}
        value={selectedCategories}
      >
        {categoryOptions?.map((item) => {
          return <Checkbox value={String(item.value)}>{item.label}</Checkbox>;
        })}
      </CheckboxGroup>

      <Button colorScheme="blue" onClick={handleChangeFilter}>
        Filtrar
      </Button>
    </Preloader>
  );
};
