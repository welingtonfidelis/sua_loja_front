import { Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  Content,
  DefaultImageContent,
  DefaultImageIcon,
  ImageDeleteIcon,
} from "./styles";
import { Props } from "./types";

export const InputImage = (props: Props) => {
  const { inputKey, imageSrc, onSelectImage, onDeleteImage } = props;
  const { t } = useTranslation();

  return (
    <Content>
      {imageSrc ? (
        <div>
          <ImageDeleteIcon onClick={onDeleteImage} />
          <img src={imageSrc} alt="" />
        </div>
      ) : (
        <DefaultImageContent>
          <label htmlFor={`input_image_file_${inputKey}`}>
            <DefaultImageIcon />

            <Input
              id={`input_image_file_${inputKey}`}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.length) {
                  onSelectImage(e.target.files[0]);
                }
              }}
            />
          </label>
        </DefaultImageContent>
      )}
    </Content>
  );
};
