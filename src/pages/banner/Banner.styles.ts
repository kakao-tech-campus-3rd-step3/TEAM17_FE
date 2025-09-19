import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
`;

export const Card = styled.div<{ $variant: 'left' | 'right' }>`
  position: relative;
  height: 10rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-image: ${({ $variant }) =>
    $variant === 'left'
      ? 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)' 
      : 'linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)'};
`;

export const Overlay = styled.div<{ $alpha?: number }>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, ${({ $alpha = 0.25 }) => $alpha});
`;

export const BottomLeft = styled.div`
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding-right: 2.25rem; 
  max-width: calc(100% - 3rem);
`;

export const TopRight = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
`;

export const Kicker = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
`;

export const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
`;

export const Badge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;
