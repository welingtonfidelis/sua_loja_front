import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Formik, Form, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

import { PageHeader } from "../../components/pageHeader";
import { Preloader } from "../../components/preloader";
import {
  useCreateCompany,
  useGetCompanyById,
  useUpdateCompany,
} from "../../services/requests/company";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";
import { responseErrorHandler } from "../../shared/handlers/responseError";
import { BordedContainer, InputTextError } from "../../shared/styles/input";
import { Alert } from "./components/alert";
import { formValidate } from "./helper/formValidate";
import {
  AvatarContent,
  AvatarIcon,
  AvatarImage,
  AvatarImageDelete,
  Container,
  FomrInputContainer,
  FormButtonContainer,
  FormContainer,
} from "./styles";
import { FormProps } from "./types";

const {
  CAN_NOT_BLOCK_YOURSELF_COMPANY,
  NAME_ALREADY_USED,
  EMAIL_ALREADY_USED,
} = HttpServerMessageEnum;

export const CompanyDetail = () => {
  const params = useParams();
  const id = params.id;
  const validateFormFields = formValidate();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading } = useGetCompanyById({ id: Number(id) });
  const { updateCompany, isLoading: isLoadingUpdateUser } = useUpdateCompany();
  const { createCompany, isLoading: isLoadingCreateUser } = useCreateCompany();
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const {
    isOpen: isOpenNewUser,
    onOpen: onOpenNewUser,
    onClose: onCloseNewUser,
  } = useDisclosure();

  const initialFormValues = useMemo(() => {
    return {
      name: data?.name || "",
      phone: data?.phone || "",
      email: data?.email || "",
      is_blocked: data?.is_blocked || false,
    };
  }, [data]);

  const [localProfileImage, setLocalProfileImage] = useState<File | null>();
  const [deleteProfileImage, setDeleteProfileImage] = useState(false);
  const handleDeleteProfileImage = () => {
    if (localProfileImage) {
      setLocalProfileImage(null);
      return;
    }

    setDeleteProfileImage(true);
    if (data) data.image_url = "";
  };

  const handleAddProfileImage = (files: FileList) => {
    setLocalProfileImage(files[0]);
    setDeleteProfileImage(false);
  };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.set(key, value);
    });

    if (localProfileImage) formData.append("image", localProfileImage);

    if (id) {
      if (deleteProfileImage) formData.append("delete_image", "true");

      updateCompany(
        { id: Number(id), data: formData as any },
        {
          onSuccess() {
            toast.success(
              t("pages.company_new_edit.success_request_edit_message", {
                username: values.name,
              }) as string
            );
            navigate(-1);
          },
          onError(error) {
            const { message } = responseErrorHandler(error);

            if (message === NAME_ALREADY_USED.message) {
              actions.setErrors({
                name: t("pages.company_new_edit.input_name_already_used"),
              });
            }

            if (message === EMAIL_ALREADY_USED.message) {
              actions.setErrors({
                email: t("pages.company_new_edit.input_email_already_used"),
              });
            }

            if (message === CAN_NOT_BLOCK_YOURSELF_COMPANY.message) {              
              actions.setErrors({
                is_blocked: t(
                  "pages.company_new_edit.input_is_blocked_own_company"
                ),
              });
            }

            toast.error(
              t("pages.company_new_edit.error_request_edit_message") as string
            );
          },
        }
      );

      return;
    }

    createCompany(formData as any, {
      onSuccess({ email, username, password }) {
        setNewUserData({
          username,
          email,
          password,
        });
        onOpenNewUser();
      },
      onError(error) {
        const { message } = responseErrorHandler(error);

        if (message === NAME_ALREADY_USED.message) {
          actions.setErrors({
            name: t("pages.company_new_edit.input_name_already_used"),
          });
        }

        if (message === EMAIL_ALREADY_USED.message) {
          actions.setErrors({
            email: t("pages.company_new_edit.input_email_already_used"),
          });
        }

        toast.error(t("pages.company_new_edit.error_request_new_message") as string);
      },
    });
  };

  const handleCloseAlert = () => {
    onCloseNewUser();
    navigate(-1);
  };

  return (
    <Container>
      <PageHeader
        title={
          id
            ? t("pages.company_new_edit.page_edit_title")
            : t("pages.company_new_edit.page_new_title")
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
                    <label htmlFor="image_file">
                      {localProfileImage || data?.image_url.length ? (
                        <AvatarImage
                          src={
                            localProfileImage
                              ? URL.createObjectURL(localProfileImage)
                              : data?.image_url
                          }
                        />
                      ) : (
                        <AvatarIcon />
                      )}
                      <Input
                        id="image_file"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          handleAddProfileImage(
                            (e?.target?.files || []) as FileList
                          );
                        }}
                      />
                    </label>

                    {(localProfileImage || Boolean(data?.image_url.length)) && (
                      <AvatarImageDelete
                        title={t(
                          "components.profile_change_password.button_delete_image"
                        )}
                        onClick={handleDeleteProfileImage}
                      />
                    )}
                  </AvatarContent>

                  {id && (
                    <FormControl>
                      <FormLabel mt="2" mb="0.2">
                        {t("pages.company_new_edit.input_id")}
                      </FormLabel>
                      <Input
                        value={id}
                        disabled
                        placeholder={t("pages.company_new_edit.input_id")}
                      />
                    </FormControl>
                  )}

                  <Field name="is_blocked">
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.company_new_edit.input_is_blocked")}
                        </FormLabel>
                        <BordedContainer inputError={Boolean(errors.is_blocked)}>
                          <Switch {...field} isChecked={field.value} />
                        </BordedContainer>
                        <InputTextError>{errors.is_blocked}</InputTextError>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="name">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.company_new_edit.input_name")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.company_new_edit.input_name")}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="phone">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.phone && touched.phone}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.company_new_edit.input_phone")}
                        </FormLabel>
                        <Input
                          {...field}
                          as={InputMask} mask="(99) 99999-9999"
                          placeholder={t("pages.company_new_edit.input_phone")}
                        />
                        <FormErrorMessage>{errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.email && touched.email}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.company_new_edit.input_email")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.company_new_edit.input_email")}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
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

      <Alert
        newUserData={newUserData}
        isOpenNewUser={isOpenNewUser}
        onCloseNewUser={handleCloseAlert}
      />
    </Container>
  );
};
