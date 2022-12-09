import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

import { FormProps, Props } from "./types";
import { formValidate } from "./helper/formValidate";
import { toast } from "react-toastify";
import { HttpServerMessageEnum } from "../../../../shared/enum/httpServerMessage";
import { Modal } from "../../../../components/modal";
import { useUpdateCompanyUser } from "../../../../services/requests/company";

const initialFormValues = {
  password: "",
  repeated_password: "",
};

export const UpdateUserPassword = (props: Props) => {
  const { isOpen, onClose, selectedUser } = props;
  const { t } = useTranslation();
  const { updateCompanyUser, isLoading } = useUpdateCompanyUser();
  const validateFormFields = formValidate();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    if (!selectedUser) return;

    updateCompanyUser(
      {
        id: Number(selectedUser.id),
        data: { password: values.password },
      },
      {
        onSuccess() {
          toast.success(
            t(
              "components.update_company_user_password.success_request_message"
            ) as string
          );
          onClose();
        },
        onError(error: any) {
          toast.error(
            t(
              "components.update_company_user_password.error_request_message"
            ) as string
          );
        },
      }
    );
  };

  return (
    <Modal
      title={t("components.update_company_user_password.page_title")}
      onConfirm={() => {}}
      isOpen={isOpen}
      onClose={onClose}
      deactiveModalButtons
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={validateFormFields}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <strong>{selectedUser?.name}</strong>

            <Field name="password">
              {({ field }: any) => (
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel mt="2" mb="0.2">
                    {t(
                      "components.update_company_user_password.input_password"
                    )}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.update_company_user_password.input_password"
                    )}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="repeated_password">
              {({ field }: any) => (
                <FormControl
                  isInvalid={
                    !!errors.repeated_password && touched.repeated_password
                  }
                >
                  <FormLabel mt="2" mb="0.2">
                    {t(
                      "components.update_company_user_password.input_repeated_password"
                    )}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.update_company_user_password.input_repeated_password"
                    )}
                  />
                  <FormErrorMessage>
                    {errors.repeated_password}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <ModalFooter paddingEnd={0}>
              <Button onClick={onClose} colorScheme="gray" marginEnd={"2"}>
                {t("generic.button_cancel")}
              </Button>
              <Button colorScheme="blue" isLoading={isLoading} type="submit">
                {t("generic.button_save")}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
