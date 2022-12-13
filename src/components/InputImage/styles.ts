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
`;

export const ImageDeleteIcon = styled(FaTimesCircle)`
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 1.2rem;
  transition: 0.5s;

  :hover {
    color: ${(props) => props.theme.colors.error};
    cursor: pointer;
    font-size: 1.3rem;
  }
`;

export const DefaultImageContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`;

export const DefaultImageIcon = styled(FaPlus)`
  font-size: 3rem;

  :hover {
    cursor: pointer;
  }
`;
