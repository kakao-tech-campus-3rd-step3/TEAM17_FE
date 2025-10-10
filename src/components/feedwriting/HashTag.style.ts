import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const HashTagBox = styled.div`
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${tokens.colors.line.blue};
  width: 60%;
  padding: 0.5rem;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tag = styled.span`
  align-items: center;
  background-color: ${tokens.colors.background.gray};
  color: ${tokens.colors.text.blue.default};
  padding: 0.3rem 0.6rem;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 500;
`;

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.gray};
  margin-left: 0.4rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    color: ${tokens.colors.orange.darker};
  }
`;

export const InputTag = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  min-width: 8rem;
  flex-grow: 1;
  margin-left: 0.2rem; 
`;

export const WarningText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${tokens.colors.text.warning};
`;