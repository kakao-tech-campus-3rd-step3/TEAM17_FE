import styled from 'styled-components';

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
`;

export const LayoutLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  border: 4px solid ${({ theme }) => theme.colors.line.blue};
  border-radius: 12px;
  padding: 3rem 1rem 3rem 1rem;
`;
