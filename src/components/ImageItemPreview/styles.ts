import { FaPlus, FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";

export const Content = styled.div`
  border: 2px dashed ${(props) => props.theme.colors.primary};
  height: 8.9rem;
  width: 8.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  & :hover {
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div``;

export const ImageDeleteIcon = styled(FaTimesCircle)`
  position: absolute;
  top: 3px;
  right: 3px;
  transition: 0.5s;

  :hover {
    color: ${(props) => props.theme.colors.error};
    cursor: pointer;
  }
`;

export const DefaultImageIcon = styled(FaPlus)`
  font-size: 3rem;
`;
