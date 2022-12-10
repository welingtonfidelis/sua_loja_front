import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import {
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";

import { Container, EditIconContent, MainContent } from "./styles";
import { PageFilter } from "./components/pageFilter";
import { toast } from "react-toastify";
import { categoryListPageStore } from "../../store/categoryListPage";
import { useGetCategories } from "../../services/requests/category";

const { CATEGORY_EDIT } = ApplicationRoutes;

export const CategoryList = () => {
  const { filters, updatePageNumber } = categoryListPageStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetCategories(filters);

  if (error) {
    toast.error(
      t("pages.category_list.error_request_get_list_message") as string
    );
  }

  // ===> TODO get/set filters param URL
  // useEffect(() => {
  //   const urlPageParam = getParams();

  //   if (!isEmpty(urlPageParam)) {
  //     Object.entries(urlPageParam).forEach((item) => {
  //       const [key, value] = item;
  //       if (Object.values(filtersType).includes(key as any)) {
  //         console.log('key: ', key, value);
  //       }
  //     });

  //     return;
  //   }

  //   setMultipleParams(filters);
  // }, [filters]);

  const columnHeader = useMemo(
    () => t("pages.category_list.table_header_columns").split("/"),
    []
  );
  const columnData = useMemo(() => {
    if (!data) return [];
    return data?.categories.map((item) => [
      item.id,
      item.name,
      <Menu>
        <MenuButton>
          <EditIconContent>
            <BsGearFill size={20} />
          </EditIconContent>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() =>
              navigate(CATEGORY_EDIT.replace(":id", String(item.id)))
            }
          >
            {t("pages.category_list.table_action_edit")}
          </MenuItem>
        </MenuList>
      </Menu>,
    ]);
  }, [data]);

  return (
    <Container>
      <MainContent>
        <Preloader isLoading={isLoading}>
          <PageFilter />
          <Divider />
          <Table columnHeader={columnHeader} columnData={columnData} />
        </Preloader>
      </MainContent>

      <Pagination
        currentPage={filters.page}
        onPageChange={updatePageNumber}
        totalItems={data?.total || 0}
      />
    </Container>
  );
};
