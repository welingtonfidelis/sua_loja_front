import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AlertConfirm } from "../../../../components/alertConfirm";
import { useUpdateProduct } from "../../../../services/requests/product";
import { useQueryData } from "../../../../shared/hooks/useQueryData";
import { Props } from "./types";

export const Alert = (props: Props) => {
  const { selectedProduct, queryKey, isOpenBlock, onCloseBlock } = props;
  const { t } = useTranslation();
  const { updateProduct, isLoading: isLoadingUpdateCompany } =
    useUpdateProduct();
  const { setStoreData } = useQueryData(queryKey, "products");

  const handleBlockUser = useCallback(() => {
    if (!selectedProduct) return;

    const { id } = selectedProduct;
    const is_active = !selectedProduct.is_active;
    updateProduct(
      { id, data: { is_active } },
      {
        onSuccess() {
          toast.success(
            t("pages.product_list.success_request_deactive_message") as string
          );
          setStoreData(
            {
              is_active,
            },
            [id],
            "id"
          );

          onCloseBlock();
        },
        onError() {
          toast.error(
            t("pages.product_list.error_request_deactive_message") as string
          );
        },
      }
    );
  }, [selectedProduct]);

  return (
    <>
      <AlertConfirm
        title={
          selectedProduct?.is_active
            ? t("pages.product_list.alert_title_active_company")
            : t("pages.product_list.alert_title_deactive_company")
        }
        description={
          selectedProduct?.is_active
            ? t("pages.product_list.alert_description_active_company", {
                name: selectedProduct?.name,
              })
            : t("pages.product_list.alert_description_deactive_company", {
                name: selectedProduct?.name,
              })
        }
        isOpen={isOpenBlock}
        onClose={onCloseBlock}
        onConfirm={handleBlockUser}
        isLoading={isLoadingUpdateCompany}
      />
    </>
  );
};
