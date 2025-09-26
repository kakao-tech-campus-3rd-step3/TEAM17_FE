import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const MediaContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  height: fit-content;
`;

export const ImageCarousel = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ImageCounter = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

export const EngagementSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${tokens.colors.line.lightGray};
`;

export const EngagementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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
  font-size: 14px;
  color: ${tokens.colors.text.gray};
  font-weight: 500;
`;

export const HashtagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

export const Hashtag = styled.span`
  background: ${tokens.colors.orange.muted};
  color: ${tokens.colors.feed.hashtag};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.light};
    color: ${tokens.colors.orange.dark};
  }
`;
