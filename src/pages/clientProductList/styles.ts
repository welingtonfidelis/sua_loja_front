import styled from "styled-components";

export const Container = styled.div`
  /* padding: .5rem; */
`;

export const HeaderContent = styled.header`
  padding: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.separator};
  display: flex;
  align-items: flex-end;
`;

export const LogoCompanyContent = styled.div`
  span.chakra-avatar {
    height: 4rem;
    width: 4rem;
  }

  @media (min-width: 601px) {
    span.chakra-avatar {
      height: 5rem;
      width: 5rem;
    }
  }
`;

export const SearchColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 0.5rem;
`;

export const SearchButtonContent = styled.div`
  button {
    border-radius: 0 8px 8px 0;
  }
`;

export const HeaderIconsContent = styled.div`
  margin-left: .5rem;

  .chakra-avatar:nth-child(2) {
    margin-left: 0.2rem;

    svg {
      font-size: 1.1rem;
    }
  }
`;
