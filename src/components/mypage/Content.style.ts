import styled from 'styled-components';

export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const Text = styled.div`
  width: 90%;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.black};
`;
