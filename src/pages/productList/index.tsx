import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";
import {
  Avatar,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";
import { Preloader } from "../../components/preloader";
import { Table } from "../../components/table";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";

import { Container, EditIconContent, MainContent } from "./styles";
import { User } from "../../domains/user";
import { Alert } from "./components/alert";
import { PageFilter } from "./components/pageFilter";
import { toast } from "react-toastify";
import { companyListPageStore } from "../../store/companyListPage";
import { useGetCompanies } from "../../services/requests/company";
import { Company } from "../../domains/company";

const { COMPANY_EDIT } = ApplicationRoutes;

export const CompanyList = () => {
  const { filters, updatePageNumber } = companyListPageStore();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isOpen: isOpenBlock,
    onOpen: onOpenBlock,
    onClose: onCloseBlock,
  } = useDisclosure();
  const { getQueryKey, data, isLoading, error } = useGetCompanies(filters);

  if (error) {
    toast.error(t("pages.company_list.error_request_get_list_message") as string);
  }

  const handleOpenAlert = (
    user: Company
  ) => {
    setSelectedCompany(user);
    onOpenBlock();
  };

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
    () => t("pages.company_list.table_header_columns").split("/"),
    []
  );
  const columnData = useMemo(() => {
    if (!data) return [];
    return data?.companies.map((item) => [
      <Avatar name={item.name} src={item.image_url} />,
      item.name,
      item.email,
      item.phone,
      item.is_blocked ? t("generic.button_yes") : t("generic.button_no"),
      <Menu>
        <MenuButton>
          <EditIconContent>
            <BsGearFill size={20} />
          </EditIconContent>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => navigate(COMPANY_EDIT.replace(":id", String(item.id)))}
          >
            {t("pages.company_list.table_action_edit")}
          </MenuItem>
          <MenuItem color="yellow.500" onClick={() => handleOpenAlert(item)}>
            {item.is_blocked
              ? t("pages.company_list.table_action_unblock")
              : t("pages.company_list.table_action_block")}
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

      <Alert
        isOpenBlock={isOpenBlock}
        onCloseBlock={onCloseBlock}
        selectedCompany={selectedCompany}
        queryKey={getQueryKey()}
      />
    </Container>
  );
};
