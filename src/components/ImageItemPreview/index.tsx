import { Content, DefaultImageIcon, ImageDeleteIcon } from "./styles";
import { Props } from "./types";

export const ImageItemPreview = (props: Props) => {
  const { imageSrc, onDeleteImage } = props;

  return (
    <Content>
      {imageSrc ? (
        <div>
          <ImageDeleteIcon onClick={onDeleteImage} />
          <img src={imageSrc} alt="" />
        </div>
      ) : (
        <DefaultImageIcon>

        </DefaultImageIcon>
      )}
    </Content>
  );
};
