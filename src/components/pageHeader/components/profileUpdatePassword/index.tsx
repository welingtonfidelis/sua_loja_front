import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import omit from "lodash/omit";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

import { Modal } from "../../../modal";
import { FormProps, Props } from "./types";
import { formValidate } from "./helper/formValidate";
import { useUpdatePassword } from "../../../../services/requests/user";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../../../../shared/handlers/responseError";
import { HttpServerMessageEnum } from "../../../../shared/enum/httpServerMessage";

const { INVALID_OLD_PASSWORD } = HttpServerMessageEnum;

const initialFormValues = {
  old_password: "",
  new_password: "",
  repeated_new_password: "",
};

export const ProfileUpdatePassword = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const { updatePassword, isLoading } = useUpdatePassword();
  const validateFormFields = formValidate();

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    updatePassword(omit(values, 'repeated_new_password'), {
      onSuccess() {
        toast.success(
          t("components.profile_change_password.success_request_message") as string
        );
        onClose();
      },
      onError(error: any) {
        const { message } = responseErrorHandler(error);

        if (message === INVALID_OLD_PASSWORD.message) {
          actions.setErrors({
            old_password: t("pages.login.input_password_invalid"),
          });
        }

        toast.error(
          t("components.profile_change_password.error_request_message") as string
        );
      },
    });
  };

  return (
    <Modal
      title={t("components.profile_change_password.page_title")}
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
            <Field name="old_password">
              {({ field }: any) => (
                <FormControl
                  isInvalid={!!errors.old_password && touched.old_password}
                >
                  <FormLabel mt="2" mb="0.2">
                    {t("components.profile_change_password.input_old_password")}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.profile_change_password.input_old_password"
                    )}
                  />
                  <FormErrorMessage>{errors.old_password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="new_password">
              {({ field }: any) => (
                <FormControl
                  isInvalid={!!errors.new_password && touched.new_password}
                >
                  <FormLabel mt="2" mb="0.2">
                    {t("components.profile_change_password.input_new_password")}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.profile_change_password.input_new_password"
                    )}
                  />
                  <FormErrorMessage>{errors.new_password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="repeated_new_password">
              {({ field }: any) => (
                <FormControl
                  isInvalid={
                    !!errors.repeated_new_password &&
                    touched.repeated_new_password
                  }
                >
                  <FormLabel mt="2" mb="0.2">
                    {t(
                      "components.profile_change_password.input_repeated_new_password"
                    )}
                  </FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t(
                      "components.profile_change_password.input_repeated_new_password"
                    )}
                  />
                  <FormErrorMessage>
                    {errors.repeated_new_password}
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
