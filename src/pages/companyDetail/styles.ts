import { FaStore, FaTimesCircle } from "react-icons/fa";
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

  & label {
    border: 4px solid ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      cursor: pointer;
      filter: brightness(0.7);
    }
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

export const AvatarIcon = styled(FaStore)`
  font-size: 7rem;
`;

export const AvatarImageDelete = styled(FaTimesCircle)`
  font-size: 1rem;
  margin-top: 0.3em;
  color: ${(props) => props.theme.colors.primary};
  transition: 0.5s;

  :hover {
    cursor: pointer;
    filter: brightness(0.7);
  }
`;

export const AvatarImage = styled.img`
  width: 7rem;
  height: 7rem;
  display: inline;
  margin: 0 auto;
`;