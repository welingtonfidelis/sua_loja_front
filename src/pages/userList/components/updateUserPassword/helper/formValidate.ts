import * as Yup from "yup";
import i18n from "i18next";

export const formValidate = () => {
  return Yup.object().shape({
    password: Yup.string()
      .min(
        3,
        i18n.t("components.update_user_password.input_password_invalid_length")
      )
      .required(i18n.t("generic.required_input_value")),
    repeated_password: Yup.string()
      .required(i18n.t("generic.required_input_value"))
      .when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          i18n.t(
            "components.update_user_password.input_repeated_password_invalid"
          )
        ),
      }),
  });
};
