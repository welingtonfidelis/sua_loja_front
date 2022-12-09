import { FaList, } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const AvatarContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & svg {
    border: 4px solid ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FormContainer = styled.div`
  flex: 1;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow: auto;
    padding: 0.5rem;
  }
`;

export const FomrInputContainer = styled.div`
  flex: 1;
`;

export const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;

  & button:first-child {
    margin-right: 0.5rem;
  }
  & button {
    flex: 1;
  }
`;

export const AvatarIcon = styled(FaList)`
  font-size: 5rem;
`;
