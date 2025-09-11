import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignupContainer = styled.form`
  padding: 1rem;
  max-width: 1000px;
  margin: 2rem auto;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 2rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.black};
  margin-bottom: 0.35rem;
`;

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  width: 800px;
  border: 2px solid ${({ theme }) => theme.colors.line.gray};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.line.blue};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const Date = styled.input`
  padding: 0.5rem 0.75rem;
  width: 390px;
  border: 2px solid ${({ theme }) => theme.colors.line.gray};
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.line.blue};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
  }
`;

export const Select = styled.select`
  padding: 0.5rem 0.75rem;
  width: 390px;
  border: 1px solid ${({ theme }) => theme.colors.line.gray};
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.line.blue};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
  }
`;

export const NextButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${({ theme }) => theme.colors.button.default};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.disabled};
    cursor: not-allowed;
  }
`;

export const Comment = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const CommentLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.warning};
  margin-top: 0.25rem;
`;
