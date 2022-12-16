import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TagsInput } from "react-tag-input-component";
import { Container, VariationDeleteIcon } from "./styles";
import { Props } from "./types";

export const VariationInput = (props: Props) => {
  const {
    nameValue,
    variationValue,
    nameValueOnChange,
    variationValueOnChange,
    onDelete,
  } = props;
  const { t } = useTranslation();

  return (
    <Container>
      <VariationDeleteIcon onClick={onDelete}/>

      <Input
        placeholder={t("pages.product_new_edit.input_variation_name")}
        value={nameValue}
        onChange={(e) => nameValueOnChange(e.target.value)}
        mb={1}
      />

      <TagsInput
        value={variationValue}
        onChange={variationValueOnChange}
        name="fruits"
        placeHolder={t("pages.product_new_edit.input_variation_value")}
      />
    </Container>
  );
};
