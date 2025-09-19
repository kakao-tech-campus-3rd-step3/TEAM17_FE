import styled from 'styled-components';

export const Wrap = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #4b5563;
`;

export const Badge = styled.span`
  font-size: 1.125rem;
  color: #ef4444;
`;

export const Button = styled.button`
  font-size: 0.875rem;
  color: #3b82f6;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
`;

export const GridItem = styled.div`
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImagePlaceholder = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
`;
