import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Formik, Form, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { PageHeader } from "../../components/pageHeader";
import { Preloader } from "../../components/preloader";
import { formValidate } from "./helper/formValidate";
import {
  AvatarIcon,
  AvatarContent,
  Container,
  FomrInputContainer,
  FormButtonContainer,
  FormContainer,
} from "./styles";
import { FormProps } from "./types";
import {
  useCreateCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "../../services/requests/category";

export const CategoryDetail = () => {
  const params = useParams();
  const id = params.id;
  const validateFormFields = formValidate();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading } = useGetCategoryById({ id: Number(id) });
  const { updateCategory, isLoading: isLoadingUpdateUser } =
    useUpdateCategory();
  const { createCategory, isLoading: isLoadingCreateUser } =
    useCreateCategory();

  const initialFormValues = useMemo(() => {
    return {
      name: data?.name || "",
    };
  }, [data]);

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    if (id) {
      updateCategory(
        { id: Number(id), data: values },
        {
          onSuccess() {
            toast.success(
              t("pages.category_new_edit.success_request_edit_message", {
                name: values.name,
              }) as string
            );
            navigate(-1);
          },
          onError(error) {
            toast.error(
              t("pages.category_new_edit.error_request_edit_message") as string
            );
          },
        }
      );

      return;
    }

    createCategory(values, {
      onSuccess() {
        toast.success(
          t("pages.category_new_edit.success_request_new_message", {
            name: values.name,
          }) as string
        );
        navigate(-1);
      },
      onError(error) {
        toast.error(
          t("pages.category_new_edit.error_request_new_message") as string
        );
      },
    });
  };

  return (
    <Container>
      <PageHeader
        title={
          id
            ? t("pages.category_new_edit.page_edit_title")
            : t("pages.category_new_edit.page_new_title")
        }
      />

      <Preloader isLoading={isLoading}>
        <FormContainer>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validateFormFields}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <FomrInputContainer>
                  <AvatarContent>
                    <AvatarIcon />
                  </AvatarContent>

                  {id && (
                    <FormControl>
                      <FormLabel mt="2" mb="0.2">
                        {t("pages.category_new_edit.input_id")}
                      </FormLabel>
                      <Input
                        value={id}
                        disabled
                        placeholder={t("pages.category_new_edit.input_id")}
                      />
                    </FormControl>
                  )}

                  <Field name="name">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.category_new_edit.input_name")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.category_new_edit.input_name")}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </FomrInputContainer>

                <FormButtonContainer>
                  <Button onClick={() => navigate(-1)}>
                    {t("generic.button_cancel")}
                  </Button>

                  <Button
                    colorScheme="blue"
                    isLoading={isLoadingUpdateUser || isLoadingCreateUser}
                    type="submit"
                  >
                    {t("generic.button_save")}
                  </Button>
                </FormButtonContainer>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Preloader>
    </Container>
  );
};
