import styled from 'styled-components';

export const SearchInputContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

export const InputContainer = styled.div<{isFirst?: boolean}>`
  display: flex;
  margin-top: ${props => props.isFirst ? '' : '.5rem'};
  width: 100%;
`;

export const SelectContainer = styled.div<{isFirst?: boolean}>`
  display: flex;
  width: 100%;

  > div {
    width: 100%;
  }
`;