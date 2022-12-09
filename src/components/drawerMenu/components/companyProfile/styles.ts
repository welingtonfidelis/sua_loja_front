import styled from "styled-components";
import { FaUser, FaTimesCircle } from "react-icons/fa";

export const AvatarContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const AvatarImage = styled.img`
  width: 8rem;
  height: 8rem;
  display: inline;
  margin: 0 auto;
`;

export const InfoContent = styled.div`
  > div {
    margin-bottom: .5rem;
  }
`;