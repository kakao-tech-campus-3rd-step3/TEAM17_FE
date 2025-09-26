import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const MediaContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
  height: fit-content;
`;

export const ImageCarousel = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 25rem;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const ImageNavButton = styled.button<{ position: 'left' | 'right' }>`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  font-size: 1.125rem;
  font-weight: bold;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
`;

export const EngagementSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${tokens.colors.line.lightGray};
`;

export const EngagementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.orange.hover};
    transform: scale(1.05);
  }
`;

export const EngagementIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.feed.like};
`;

export const EngagementCount = styled.span`
  font-size: 0.875rem;
  color: ${tokens.colors.text.gray};
  font-weight: 500;
`;

export const HashtagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const Hashtag = styled.span`
  background: ${tokens.colors.orange.muted};
  color: ${tokens.colors.feed.hashtag};
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.light};
    color: ${tokens.colors.orange.dark};
  }
`;
