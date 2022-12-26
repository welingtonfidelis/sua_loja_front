import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  .custom-shape-divider-top-1672065602 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-top-1672065602 svg {
    position: relative;
    display: block;
    width: calc(113% + 1.3px);
    height: 138px;
  }

  .custom-shape-divider-top-1672065602 .shape-fill {
    fill: ${(props) => props.theme.colors.primary};
  }

  @media (min-width: 601px) {
    flex-direction: row;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  span {
    text-align: center;
  }

  @media (min-width: 601px) {
    width: 52%;

    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;

    border-right: 1px solid ${(props) => props.theme.colors.primary};
    padding-right: 2rem;
    margin-right: 2rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;

  span {
    text-align: center;
  }

  span:last-of-type {
    :hover {
      transition: 0.5s;
      cursor: pointer;
      font-weight: 500;
    }
  }

  b {
    cursor: pointer;
  }

  @media (min-width: 601px) {
    width: 48%;
  }
`;

export const SelectSearchContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 6rem;

  > div {
    flex: 1;
    margin-right: 0.5rem;
  }
`;
