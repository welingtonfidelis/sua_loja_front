import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = () => {
  return Yup.object().shape({
    name: Yup.string().required(i18n.t("generic.required_input_value")),
    phone: Yup.string().required(i18n.t("generic.required_input_value")),
    email: Yup.string()
      .email(i18n.t("pages.company_new_edit.input_email_format_invalid"))
      .required(i18n.t("generic.required_input_value")),
  });
};
