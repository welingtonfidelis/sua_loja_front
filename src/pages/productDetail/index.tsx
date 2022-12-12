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
import { Select as SelectSearch } from "chakra-react-select";
import { Field, Formik, Form, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ImageItemPreview } from "../../components/ImageItemPreview";

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
  ImageListContainer,
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
  const [variation1Value, setVariation1Value] = useState("");
  const [variation2Value, setVariation2Value] = useState("");
  const [productImages, setProductImages] = useState<File[] | string[]>([]);
  const [productDeleteImages, setProductDeleteImages] = useState<string[]>([]);

  const initialFormValues = useMemo(() => {
    if (data) setProductImages(data.images);

    return {
      name: data?.name || "",
      description: data?.description || "",
      quantity: data?.quantity || 0,
      price: data?.price || 0,
      category_id: data?.category_id || 0,
      is_active: data?.is_active || false,
      variation_1: data?.variation_1 || [],
      variation_2: data?.variation_2 || [],
    };
  }, [data]);

  const handleDeleteImage = (index: number) => {
    if (typeof productImages[index] === "string") {
      setProductDeleteImages((oldState) => [
        ...oldState,
        productImages[index] as string,
      ]);
    }

    setProductImages((oldState) => {
      const newState: any = [];

      oldState.forEach((item, localIndex) => {
        if (localIndex !== index) newState.push(item);
      });

      return newState;
    });
  };

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "variation_1" && key !== "variation_2") {
        formData.set(key, value);
      }
    });

    values.variation_1.forEach((item) =>
      formData.append("variation_1[]", item)
    );
    values.variation_2.forEach((item) =>
      formData.append("variation_2[]", item)
    );

    if (productImages.length) {
      (productImages as any[])
        .filter((item) => typeof item !== "string")
        .forEach((item) => formData.append("files", item));
    }

    if (productDeleteImages.length) {
      productDeleteImages.forEach((item) =>
        formData.append("delete_files", item)
      );
    }

    if (id) {
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

  const handleAddVariation = (original: string[], newValue: string) => {
    if (!original.find((item) => item === newValue)) {
      return [...original, newValue];
    }

    return original;
  };

  const handleRemoveVariation = (original: string[], newValue: string) => {
    return original.filter((item) => item !== newValue);
  };

  const getImageSrc = (index: number) => {
    if (productImages[index]) {
      if (typeof productImages[index] === "string") {
        return productImages[index] as string;
      }

      return URL.createObjectURL(productImages[index] as File);
    }

    return "";
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
                        <SelectSearch
                          {...field}
                          isLoading={isLoadingGetCategories}
                          onChange={(e: any) =>
                            setFieldValue("category_id", e.value)
                          }
                          value={categoryOptions?.find(
                            (item) => item.value === values.category_id
                          )}
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
                          mb="1.5"
                          value={variation1Value}
                          onChange={(e) => setVariation1Value(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              setFieldValue(
                                "variation_1",
                                handleAddVariation(
                                  values.variation_1,
                                  variation1Value
                                )
                              );
                              setVariation1Value("");
                            }
                          }}
                          placeholder={t(
                            "pages.product_new_edit.input_variation_1"
                          )}
                        />
                        {values.variation_1.map((item, index) => {
                          return (
                            <Tag key={index} mr="1">
                              <TagLabel>{item}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  setFieldValue(
                                    "variation_1",
                                    handleRemoveVariation(
                                      values.variation_1,
                                      item
                                    )
                                  )
                                }
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
                          mb="1.5"
                          value={variation2Value}
                          onChange={(e) => setVariation2Value(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              setFieldValue(
                                "variation_2",
                                handleAddVariation(
                                  values.variation_2,
                                  variation2Value
                                )
                              );
                              setVariation2Value("");
                            }
                          }}
                          placeholder={t(
                            "pages.product_new_edit.input_variation_2"
                          )}
                        />
                        {values.variation_2.map((item, index) => {
                          return (
                            <Tag key={index} mr="1">
                              <TagLabel>{item}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  setFieldValue(
                                    "variation_2",
                                    handleRemoveVariation(
                                      values.variation_2,
                                      item
                                    )
                                  )
                                }
                              />
                            </Tag>
                          );
                        })}
                      </FormControl>
                    )}
                  </Field>

                  <FormLabel mt="2" mb="0.2">
                    {t("pages.product_new_edit.input_images")}
                  </FormLabel>
                  <BordedContainer>
                    <ImageListContainer>
                      {Array(9)
                        .fill({})
                        .map((_, index) => {
                          return (
                            <label htmlFor={`image_file_${index}`}>
                              <ImageItemPreview
                                onDeleteImage={() => handleDeleteImage(index)}
                                imageSrc={getImageSrc(index)}
                              />

                              <Input
                                id={`image_file_${index}`}
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.length) {
                                    setProductImages((oldState) => {
                                      const newState = [
                                        ...oldState,
                                        (e?.target?.files || [])[0],
                                      ];

                                      return newState as string[];
                                    });
                                  }
                                }}
                              />
                            </label>
                          );
                        })}
                    </ImageListContainer>
                  </BordedContainer>
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
