import { FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  width: calc((100% - 20px) / 2);
  margin-bottom: 1rem;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const VariationDeleteIcon = styled(FaTimesCircle)`
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 1.2rem;
  z-index: 99;
  transition: 0.5s;

  :hover {
    color: ${(props) => props.theme.colors.error};
    cursor: pointer;
    font-size: 1.3rem;
  }
`;