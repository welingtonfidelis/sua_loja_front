import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { AlertConfirm } from "../../../../components/alertConfirm";
import { useUpdateCompanyUser } from "../../../../services/requests/company";
import { useQueryData } from "../../../../shared/hooks/useQueryData";
import { Props } from "./types";

export const Alert = (props: Props) => {
  const {
    selectedUser,
    queryKey,
    isOpenBlock,
    onCloseBlock,
  } = props;
  const { t } = useTranslation();
  const { updateCompanyUser, isLoading: isLoadingUpdateUser } = useUpdateCompanyUser();
  const { setStoreData } = useQueryData(queryKey, "users");

  const handleBlockUser = useCallback(() => {
    if (!selectedUser) return;

    const { id } = selectedUser;
    const is_blocked = !selectedUser.is_blocked;
    updateCompanyUser(
      { id, data: { is_blocked } },
      {
        onSuccess() {
          toast.success(t("pages.company_user_list.success_request_block_message") as string);
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
          toast.error(t("pages.company_user_list.error_request_block_message") as string);
        },
      }
    );
  }, [selectedUser]);

  return (
    <>
      <AlertConfirm
        title={
          selectedUser?.is_blocked
            ? t("pages.company_user_list.alert_title_unblock_user")
            : t("pages.company_user_list.alert_title_block_user")
        }
        description={
          selectedUser?.is_blocked
            ? t("pages.company_user_list.alert_description_unblock_user", {
                name: selectedUser?.name,
              })
            : t("pages.company_user_list.alert_description_block_user", {
                name: selectedUser?.name,
              })
        }
        isOpen={isOpenBlock}
        onClose={onCloseBlock}
        onConfirm={handleBlockUser}
        isLoading={isLoadingUpdateUser}
      />
    </>
  );
};
