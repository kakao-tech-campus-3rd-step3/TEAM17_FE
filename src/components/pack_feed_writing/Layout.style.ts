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
  justify-content: center;
  width: 100%;
`;

export const InputField = styled.input`
  width: 50%;
  padding: 0.8rem 1rem;
  margin: 0.3rem auto 1rem auto;
  border:  2px solid ${({ theme }) => theme.colors.line.blue};
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.black};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.gray};
  }

`;

export const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.orange.primary};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color:  ${({ theme }) => theme.colors.orange.darker};
  }
`;

export const WarningText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text.warning};
  font-size: 0.9rem;
  text-align: center;
`;
