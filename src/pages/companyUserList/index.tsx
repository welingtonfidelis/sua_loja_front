import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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

import { Container, EditIconContent, MainContent } from "./styles";
import { User } from "../../domains/user";
import { Alert } from "./components/alert";
import { PageFilter } from "./components/pageFilter";
import { toast } from "react-toastify";
import { UpdateUserPassword } from "./components/updateUserPassword";
import { companyUserListPageStore } from "../../store/companyUserListPage";
import { useGetCompanyUsers } from "../../services/requests/company";

export const CompanyUserList = () => {
  const { filters, updatePageNumber } = companyUserListPageStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();
  const {
    isOpen: isOpenBlock,
    onOpen: onOpenBlock,
    onClose: onCloseBlock,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdatePassword,
    onOpen: onOpenUpdatePassword,
    onClose: onCloseUpdatePassword,
  } = useDisclosure();
  const { getQueryKey, data, isLoading, error } = useGetCompanyUsers(filters);

  if (error) {
    toast.error(
      t("pages.company_user_list.error_request_get_list_message") as string
    );
  }

  const handleOpenAlert = (user: User, type: "block" | "password") => {
    switch (type) {
      case "block":
        onOpenBlock();
        break;

      default:
        onOpenUpdatePassword();
        break;
    }

    setSelectedUser(user);
  };

  const handleCloseAlert = (type: "block" | "password") => {
    switch (type) {
      case "block":
        onCloseBlock();
        break;

      default:
        onCloseUpdatePassword();
        break;
    }

    setSelectedUser(null);
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
    () => t("pages.company_user_list.table_header_columns").split("/"),
    []
  );
  const columnData = useMemo(() => {
    if (!data) return [];

    return data?.users.map((item) => [
      <Avatar name={item.name} src={item.image_url} />,
      item.name,
      item.email,
      item.company.name,
      item.is_blocked ? t("generic.button_yes") : t("generic.button_no"),
      <Menu>
        <MenuButton>
          <EditIconContent>
            <BsGearFill size={20} />
          </EditIconContent>
        </MenuButton>
        <MenuList>
          <MenuItem
            color="yellow.500"
            onClick={() => handleOpenAlert(item, "password")}
          >
            {t("pages.company_user_list.table_action_update_password")}
          </MenuItem>
          <MenuItem
            color="yellow.500"
            onClick={() => handleOpenAlert(item, "block")}
          >
            {item.is_blocked
              ? t("pages.company_user_list.table_action_unblock")
              : t("pages.company_user_list.table_action_block")}
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
        onCloseBlock={() => handleCloseAlert("block")}
        selectedUser={selectedUser}
        queryKey={getQueryKey()}
      />

      <UpdateUserPassword
        isOpen={isOpenUpdatePassword}
        onClose={() => handleCloseAlert("password")}
        selectedUser={selectedUser}
      />
    </Container>
  );
};
