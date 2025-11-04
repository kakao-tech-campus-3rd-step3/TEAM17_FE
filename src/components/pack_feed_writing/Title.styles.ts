import styled from 'styled-components';

export const TitleStyle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.blue.default};
`;

export const Desc = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.blue.disabled};
`;
