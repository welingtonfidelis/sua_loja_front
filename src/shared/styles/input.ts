import styled from "styled-components";

export const BordedContainer = styled.div<{inputError?: boolean}>`
  border: 1px solid ${(props) => props.inputError ? props.theme.colors.error : props.theme.colors.separator};
  border-radius: 6px;
  padding: 8px 1rem;
`;

export const InputTextError = styled.span`
  margin-top: .5rem;
  font-size: 14px;
  color: ${props => props.theme.colors.error};
`