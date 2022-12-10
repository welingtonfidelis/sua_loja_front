import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = () => {
  return Yup.object().shape({
    name: Yup.string().required(i18n.t("generic.required_input_value")),
    description: Yup.string().required(i18n.t("generic.required_input_value")),
    quantity: Yup.number().positive(i18n.t("pages.product_new_edit.input_quantity_min_invalid")).required(i18n.t("generic.required_input_value")),
    price: Yup.number().positive(i18n.t("pages.product_new_edit.input_price_min_invalid")).required(i18n.t("generic.required_input_value")),
    category_id: Yup.number().positive(i18n.t("pages.product_new_edit.input_category_invalid")).required(i18n.t("generic.required_input_value")),
  });
};
