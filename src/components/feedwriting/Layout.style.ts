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
  width: 90%;
  border: 3px solid ${({ theme }) => theme.colors.line.blue};
  border-radius: 12px;
  padding: 1.5rem 1rem 1.5rem 1rem;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ContentLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
`;
