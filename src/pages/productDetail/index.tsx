import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { Select as SelectSearch } from "chakra-react-select";
import { Field, Formik, Form, FormikHelpers, FormikErrors } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { InputImage } from "../../components/InputImage";

import { PageHeader } from "../../components/pageHeader";
import { Preloader } from "../../components/preloader";
import { ProductVariation } from "../../domains/productVariation";
import { useGetCategoryOptionsFormat } from "../../services/requests/category";
import {
  useCreateProduct,
  useGetProductById,
  useUpdateProduct,
} from "../../services/requests/product";
import { BordedContainer, InputTextError } from "../../shared/styles/input";
import { VariationInput } from "./components/variatonInput";
import { formValidate } from "./helper/formValidate";
import {
  Container,
  FomrInputContainer,
  FormButtonContainer,
  FormContainer,
  ImageListContainer,
  VariationListContainer,
  VariationListContent,
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
  const [productImages, setProductImages] = useState<File[] | string[]>([]);
  const [productDeleteImages, setProductDeleteImages] = useState<string[]>([]);
  const deleteVariationId: number[] = [];

  const initialFormValues = useMemo(() => {
    if (data) setProductImages(data.images);

    return {
      name: data?.name || "",
      description: data?.description || "",
      quantity: data?.quantity || 0,
      price: data?.price || 0,
      category_id: data?.category_id || 0,
      is_active: data?.is_active || false,
      variation: data?.variation || [],
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

  const handleChangeVariationName = (
    id: number,
    name: string,
    originalVariation: ProductVariation[]
  ) => {
    const updatedVariation = originalVariation.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          name,
        };
      }
      return item;
    });

    return updatedVariation;
  };

  const handleChangeVariationValue = (
    id: number,
    value: string[],
    originalVariation: ProductVariation[]
  ) => {
    const updatedVariation = originalVariation.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });

    return updatedVariation;
  };

  const handleDeleteVariation = (
    id: number,
    originalVariation: ProductVariation[]
  ) => {
    if (id > 0) deleteVariationId.push(id);

    const updatedVariation = originalVariation.filter((item) => item.id !== id);

    return updatedVariation;
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

  const handleSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "variation") {
        formData.set(key, value);
      }
    });

    (productImages as any[])
      .filter((item) => typeof item !== "string")
      .forEach((item) => formData.append("images", item));

    productDeleteImages.forEach((item) =>
      formData.append("delete_images[]", item)
    );

    let addVariationCount = 0;
    let updateVariationCount = 0;
    values.variation.forEach((item, index) => {
      if (item.id <= 0) {
        formData.append(`add_variation[${addVariationCount}][name]`, item.name);

        item.value.forEach((subItem) => {
          formData.append(
            `add_variation[${addVariationCount}][value][]`,
            subItem
          );
        });
        addVariationCount += 1;
      } else {
        formData.append(
          `update_variation[${updateVariationCount}][id]`,
          String(item.id)
        );

        formData.append(
          `update_variation[${updateVariationCount}][name]`,
          item.name
        );

        item.value.forEach((subItem) => {
          formData.append(
            `update_variation[${updateVariationCount}][value][]`,
            subItem
          );
        });

        updateVariationCount += 1;
      }
    });

    deleteVariationId.forEach((item) => {
      formData.append("delete_variation[]", String(item));
    });

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

                  <Field name="variation">
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel mt="2" mb="0.2">
                          {t("pages.product_new_edit.input_variation")}
                        </FormLabel>
                        <BordedContainer
                          inputError={Boolean(errors?.variation)}
                        >
                          <VariationListContent>
                            <VariationListContainer>
                              {values.variation.map((item) => {
                                return (
                                  <VariationInput
                                    nameValue={item.name}
                                    nameValueOnChange={(name) => {
                                      const updatedItems =
                                        handleChangeVariationName(
                                          item.id,
                                          name,
                                          values.variation
                                        );

                                      setFieldValue("variation", updatedItems);
                                    }}
                                    variationValue={item.value}
                                    variationValueOnChange={(value) => {
                                      const updatedItems =
                                        handleChangeVariationValue(
                                          item.id,
                                          value,
                                          values.variation
                                        );

                                      setFieldValue("variation", updatedItems);
                                    }}
                                    onDelete={() => {
                                      const updatedItems =
                                        handleDeleteVariation(
                                          item.id,
                                          values.variation
                                        );

                                      setFieldValue("variation", updatedItems);
                                    }}
                                  />
                                );
                              })}
                            </VariationListContainer>

                            <IconButton
                              aria-label="Add variation"
                              icon={<FaPlus />}
                              onClick={() => {
                                const emptyVariation = {
                                  id: values.variation.length * -1,
                                  name: "",
                                  value: [],
                                };

                                setFieldValue("variation", [
                                  ...values.variation,
                                  emptyVariation,
                                ]);
                              }}
                            />
                          </VariationListContent>
                        </BordedContainer>
                        <InputTextError>
                          {
                            (
                              (errors?.variation ||
                                []) as FormikErrors<ProductVariation>[]
                            ).find((item) => item)?.value
                          }
                        </InputTextError>
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
                            <InputImage
                              inputKey={String(index)}
                              onDeleteImage={() => handleDeleteImage(index)}
                              imageSrc={getImageSrc(index)}
                              onSelectImage={(newImage) => {
                                setProductImages((oldState) => {
                                  const newState = [...oldState, newImage];

                                  return newState as string[];
                                });
                              }}
                            />
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
