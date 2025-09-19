import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginContainer = styled.form`
  padding: 1rem;
  max-width: 70%;
  margin: 2rem auto;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

export const Inputfield = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  gap: 0.7rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.6px solid ${({ theme }) => theme.colors.orange};
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: 0 0 0 2px rgba(236, 107, 26, 0.2);
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

export const SubmitButton = styled.button`
  border-radius: 12px;
  border: none;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text.white};
  font-size: 1.2rem;
  font-weight: 400;
  background: ${({ theme }) => theme.colors.orange};
  box-shadow: 0 2px 4px 0 #fed7aa, 0 4px 6px 0 #fed7aa;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Line = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.line.gray};
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.warning};
  margin-top: 0.25rem;
`;

export const SocialButton = styled.button<{ $bgColor: string; $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;
  gap: 0.5rem;
  width: 40%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 500;

  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color || '#000'};

  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const Comment = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const CommentLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
