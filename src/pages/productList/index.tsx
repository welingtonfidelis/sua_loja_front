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
import { Alert } from "./components/alert";
import { PageFilter } from "./components/pageFilter";
import { toast } from "react-toastify";
import { productListPageStore } from "../../store/productListPage";
import { useGetProducts } from "../../services/requests/product";
import { Product } from "../../domains/product";

const { PRODUCT_EDIT } = ApplicationRoutes;

export const ProductList = () => {
  const { filters, updatePageNumber } = productListPageStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isOpen: isOpenBlock,
    onOpen: onOpenBlock,
    onClose: onCloseBlock,
  } = useDisclosure();
  const { getQueryKey, data, isLoading, error } = useGetProducts(filters);

  console.log(filters);
  

  if (error) {
    toast.error(t("pages.product_list.error_request_get_list_message") as string);
  }

  const handleOpenAlert = (
    user: Product
  ) => {
    setSelectedProduct(user);
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
    () => t("pages.product_list.table_header_columns").split("/"),
    []
  );
  const columnData = useMemo(() => {
    if (!data) return [];
    return data?.products.map((item) => [
      <Avatar name={item.name} src={item.images[0]} />,
      item.name,
      item.quantity,
      item.price,
      item.is_active ? t("generic.button_yes") : t("generic.button_no"),
      <Menu>
        <MenuButton>
          <EditIconContent>
            <BsGearFill size={20} />
          </EditIconContent>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => navigate(PRODUCT_EDIT.replace(":id", String(item.id)))}
          >
            {t("pages.product_list.table_action_edit")}
          </MenuItem>
          <MenuItem color="yellow.500" onClick={() => handleOpenAlert(item)}>
            {item.is_active
              ? t("pages.product_list.table_action_active")
              : t("pages.product_list.table_action_deactive")}
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
        selectedProduct={selectedProduct}
        queryKey={getQueryKey()}
      />
    </Container>
  );
};
