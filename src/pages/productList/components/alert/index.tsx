import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AlertConfirm } from "../../../../components/alertConfirm";
import { useUpdateCompany } from "../../../../services/requests/company";
import { useQueryData } from "../../../../shared/hooks/useQueryData";
import { Props } from "./types";

export const Alert = (props: Props) => {
  const { selectedCompany, queryKey, isOpenBlock, onCloseBlock } = props;
  const { t } = useTranslation();
  const { updateCompany, isLoading: isLoadingUpdateCompany } =
    useUpdateCompany();
  const { setStoreData } = useQueryData(queryKey, "companies");

  const handleBlockUser = useCallback(() => {
    if (!selectedCompany) return;

    const { id } = selectedCompany;
    const is_blocked = !selectedCompany.is_blocked;
    updateCompany(
      { id, data: { is_blocked } },
      {
        onSuccess() {
          toast.success(
            t("pages.company_list.success_request_block_message") as string
          );
          setStoreData(
            {
              is_blocked,
            },
            [id],
            "id"
          );

          onCloseBlock();
        },
        onError() {
          toast.error(
            t("pages.company_list.error_request_block_message") as string
          );
        },
      }
    );
  }, [selectedCompany]);

  return (
    <>
      <AlertConfirm
        title={
          selectedCompany?.is_blocked
            ? t("pages.company_list.alert_title_unblock_company")
            : t("pages.company_list.alert_title_block_company")
        }
        description={
          selectedCompany?.is_blocked
            ? t("pages.company_list.alert_description_unblock_company", {
                name: selectedCompany?.name,
              })
            : t("pages.company_list.alert_description_block_company", {
                name: selectedCompany?.name,
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
