import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Field, Formik, Form, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { PageHeader } from "../../components/pageHeader";
import { Preloader } from "../../components/preloader";
import { useGetCategoryOptionsFormat } from "../../services/requests/category";
import {
  useCreateProduct,
  useGetProductById,
  useUpdateProduct,
} from "../../services/requests/product";
import { BordedContainer, InputTextError } from "../../shared/styles/input";
import { formValidate } from "./helper/formValidate";
import {
  Container,
  FomrInputContainer,
  FormButtonContainer,
  FormContainer,
} from "./styles";
import { FormProps } from "./types";

export const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const validateFormFields = formValidate();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading } = useGetProductById({ id: Number(id) });
  const { updateProduct, isLoading: isLoadingUpdateUser } = useUpdateProduct();
  const { createProduct, isLoading: isLoadingCreateUser } = useCreateProduct();
  const { isLoading: isLoadingGetCategories, data: categoryOptions } =
    useGetCategoryOptionsFormat();
  const [variation1, setVariation1] = useState<string[]>([]);
  const [variation2, setVariation2] = useState<string[]>([]);

  const initialFormValues = useMemo(() => {
    return {
      name: data?.name || "",
      description: data?.description || "",
      quantity: data?.quantity || 0,
      price: data?.price || 0,
      category_id: data?.category_id || 0,
      is_active: data?.is_active || false,
    };
  }, [data]);

  const defaultSelectedCategory = useMemo(() => {
    return categoryOptions?.find((item) => item.value === initialFormValues.category_id)
  }, [initialFormValues]);


  // const [localProfileImage, setLocalProfileImage] = useState<File | null>();
  // const [deleteProfileImage, setDeleteProfileImage] = useState([]);
  // const handleDeleteProfileImage = () => {
  //   if (localProfileImage) {
  //     setLocalProfileImage(null);
  //     return;
  //   }

  //   setDeleteProfileImage(true);
  //   if (data) data.image_url = "";
  // };

  // const handleAddProfileImage = (files: FileList) => {
  //   setLocalProfileImage(files[0]);
  //   setDeleteProfileImage(false);
  // };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    console.log("values: ", values);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if(key !== "variation_1" && key !== "variation_2") {
        formData.set(key, value);
      }
    });

    variation1.forEach((item) => formData.append("variation_1[]", item));
    variation2.forEach((item) => formData.append("variation_2[]", item));

    // if (localProfileImage) formData.append("file", localProfileImage);

    if (id) {
      // if (deleteProfileImage) formData.append("delete_image", "true");

      updateProduct(
        { id: Number(id), data: formData as any },
        {
          onSuccess() {
            toast.success(
              t("pages.product_new_edit.success_request_edit_message", {
                name: values.name,
              }) as string
            );
            navigate(-1);
          },
          onError(error) {
            toast.error(
              t("pages.product_new_edit.error_request_edit_message") as string
            );
          },
        }
      );

      return;
    }

    createProduct(formData as any, {
      onSuccess() {
        toast.success(
          t("pages.product_new_edit.success_request_new_message", {
            name: values.name,
          }) as string
        );
        navigate(-1);
      },
      onError(error) {
        toast.error(
          t("pages.product_new_edit.error_request_new_message") as string
        );
      },
    });
  };

  const handleAddVariation = (value: string, type: 1 | 2) => {
    switch (type) {
      case 1:
        if (!variation1.find((item) => item === value)) {
          setVariation1((oldState) => [...oldState, value]);
        }
        break;

      default:
        if (!variation2.find((item) => item === value)) {
          setVariation2((oldState) => [...oldState, value]);
        }
        break;
    }
  };

  const handleRemoveVariation = (value: string, type: 1 | 2) => {
    switch (type) {
      case 1:
        setVariation1((oldState) => {
          return oldState.filter((subItem) => subItem !== value);
        });
        break;

      default:
        setVariation2((oldState) => {
          return oldState.filter((subItem) => subItem !== value);
        });
        break;
    }
  };

  return (
    <Container>
      <PageHeader
        title={
          id
            ? t("pages.product_new_edit.page_edit_title")
            : t("pages.product_new_edit.page_new_title")
        }
      />

      <Preloader isLoading={isLoading}>
        <FormContainer>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validateFormFields}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <FomrInputContainer>
                  {/* <AvatarContent>
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
                  </AvatarContent> */}

                  {id && (
                    <FormControl>
                      <FormLabel mt="2" mb="0.2">
                        {t("pages.product_new_edit.input_id")}
                      </FormLabel>
                      <Input
                        value={id}
                        disabled
                        placeholder={t("pages.product_new_edit.input_id")}
                      />
                    </FormControl>
                  )}

                  <Field name="is_active">
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_is_active")}
                        </FormLabel>
                        <BordedContainer inputError={Boolean(errors.is_active)}>
                          <Switch {...field} isChecked={field.value} />
                        </BordedContainer>
                        <InputTextError>{errors.is_active}</InputTextError>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="name">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.name && touched.name}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_name")}
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={t("pages.product_new_edit.input_name")}
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!errors.description && touched.description}
                      >
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_description")}
                        </FormLabel>
                        <Textarea
                          {...field}
                          placeholder={t(
                            "pages.product_new_edit.input_description"
                          )}
                        />
                        <FormErrorMessage>
                          {errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="quantity">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!errors.quantity && touched.quantity}
                      >
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_quantity")}
                        </FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder={t(
                            "pages.product_new_edit.input_quantity"
                          )}
                        />
                        <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="price">
                    {({ field }: any) => (
                      <FormControl isInvalid={!!errors.price && touched.price}>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_price")}
                        </FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder={t("pages.product_new_edit.input_price")}
                        />
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="category_id">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!errors.category_id && touched.category_id}
                      >
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_category")}
                        </FormLabel>
                        <Select
                          isLoading={isLoadingGetCategories}
                          onChange={(e: any) =>
                            setFieldValue("category_id", e.value)
                          }
                          defaultValue={defaultSelectedCategory}
                          options={categoryOptions}
                          placeholder={t(
                            "pages.product_new_edit.input_category"
                          )}
                        />
                        <FormErrorMessage>
                          {errors.category_id}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="variation_1">
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_variation_1")}
                        </FormLabel>
                        <Input
                          {...field}
                          mb="1.5"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddVariation((e.target as any).value, 1);
                              setFieldValue("variation_1", "");
                            }
                          }}
                          placeholder={t(
                            "pages.product_new_edit.input_variation_1"
                          )}
                        />
                        {(data?.variation_1 || variation1).map((item, index) => {
                          return (
                            <Tag key={index} mr="1">
                              <TagLabel>{item}</TagLabel>
                              <TagCloseButton
                                onClick={() => handleRemoveVariation(item, 1)}
                              />
                            </Tag>
                          );
                        })}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="variation_2">
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_variation_2")}
                        </FormLabel>
                        <Input
                          {...field}
                          mb="1.5"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddVariation((e.target as any).value, 2);
                              setFieldValue("variation_2", "");
                            }
                          }}
                          placeholder={t(
                            "pages.product_new_edit.input_variation_2"
                          )}
                        />
                        {(data?.variation_2 || variation2).map((item, index) => {
                          return (
                            <Tag key={index} mr="1">
                              <TagLabel>{item}</TagLabel>
                              <TagCloseButton
                                onClick={() => handleRemoveVariation(item, 2)}
                              />
                            </Tag>
                          );
                        })}
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
