import styled from 'styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
`;

export const Card = styled.div<{ $variant: 'left' | 'right' }>`
  position: relative;
  flex: 1;
  min-width: 0;
  height: 16rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-image: ${({ $variant }) =>
    $variant === 'left'
      ? 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)'
      : 'linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)'};
  transition: transform 0.3s ease;
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
  z-index: 1;
`;

export const TopRight = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  z-index: 1;
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

export const NavigationButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => ($position === 'left' ? 'left: 0.5rem' : 'right: 0.5rem')};
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  &:focus-visible {
    outline: 0.125rem solid #f97316;
    outline-offset: 0.125rem;
  }
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 0.625rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 2;
`;
