import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const SectionWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem; 

  h3 {
    font-size: 1.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11.25rem, 1fr));
  gap: 1rem; 
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 11.25rem; 
  border-radius: 0.5rem; 
  object-fit: cover;
  padding: 0.25rem;
  border: 2.5px solid ${tokens.colors.line.disabled};
`;

export const TotalButton = styled.button`
  background: none;
  border: none;
  padding: 0.625rem 0;

  font-size: 1.3rem;
  font-weight: 600;
  color: ${tokens.colors.text.blue.default};
  cursor: default;
`;