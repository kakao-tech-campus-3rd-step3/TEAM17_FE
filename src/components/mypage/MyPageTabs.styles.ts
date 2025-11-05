import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
  border-bottom: 0.0625rem solid #e5e5e5;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0.625rem 0;

  font-size: 1.3rem;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active }) => ($active ? '#174A7E' : '#666')};
  border-bottom: ${({ $active }) => ($active ? '0.125rem solid #174A7E' : 'none')};
  cursor: pointer;
`;

