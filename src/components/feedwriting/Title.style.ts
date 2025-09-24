import styled from 'styled-components';

export const TitleStyle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text.blue.default};
`;

export const Desc = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.blue.disabled};
`;
