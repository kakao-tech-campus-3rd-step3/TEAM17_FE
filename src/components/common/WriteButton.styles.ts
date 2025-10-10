import styled from 'styled-components';

export const Button = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 100, 0, 0.4);
  transition: all 0.3s ease;
  z-index: 999;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange.hover};
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(255, 100, 0, 0.5);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.orange.active};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    right: 1.5rem;
    bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 3rem;
    height: 3rem;
    right: 1rem;
    bottom: 1rem;
  }
`;

export const Icon = styled.span`
  font-size: 1.5rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.375rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;
