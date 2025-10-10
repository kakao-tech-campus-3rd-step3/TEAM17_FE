import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const LinkUploadBox = styled.div<{ hasProducts: boolean }>`
  display: flex;
  justify-content: center;
  align-items: ${({ hasProducts }) => (hasProducts ? 'flex-start' : 'center')};
  text-align: center;

  width: 60%;
  height: 20rem;
  border: 2px solid ${tokens.colors.line.blue};
  border-radius: 10%;
  margin-bottom: 1rem;
  padding: 2rem;

  overflow-y: ${({ hasProducts }) => (hasProducts ? 'auto' : 'hidden')};
  overflow-x: hidden;

  scrollbar-width: thin;
  scrollbar-color: ${tokens.colors.line.blue} transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${tokens.colors.line.blue};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  span {
    font-size: 1.5rem;
    color: ${tokens.colors.text.black};
    word-break: break-word;
  }
`;

export const ProductImage = styled.img`
  width: 50%;
  height: auto; 
  object-fit: cover;
  border-radius: 8px;
  margin-left: 0.4rem;
`;
