import styled from '@emotion/styled';
import { Heart, Eye, Star } from 'lucide-react';

export const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
  }
`;

export const LikeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  padding: 8px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &:hover {
    background: #fff;
  }
`;

export const HeartIcon = styled(Heart)<{ liked?: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ liked }) => (liked ? '#ef4444' : '#9ca3af')};
  fill: ${({ liked }) => (liked ? '#ef4444' : 'none')};
  transition: color 0.2s ease, fill 0.2s ease;
`;

export const DiscountBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: #ef4444;
  color: #fff;
  padding: 6px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
`;

export const ImageWrap = styled.div`
  position: relative;
  height: 256px;
  overflow: hidden;
  cursor: pointer;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.3s ease;
  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

export const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s ease;
  ${Card}:hover & {
    opacity: 1;
  }
`;

export const PreviewCenter = styled.div`
  text-align: center;
`;

export const EyeIcon = styled(Eye)`
  width: 32px;
  height: 32px;
  display: block;
  margin: 0 auto 8px;
`;

export const MoreText = styled.div`
  opacity: 0.8;
  font-size: 12px;
  margin-top: 8px;
`;

export const Content = styled.div`
  padding: 24px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CategoryPill = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #2563eb;
  background: #dbeafe;
  padding: 4px 8px;
  border-radius: 9999px;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 14px;
`;

export const StarIcon = styled(Star)`
  width: 16px;
  height: 16px;
  color: #f59e0b;
  fill: #f59e0b;
`;

export const Title = styled.h3`
  margin: 8px 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  transition: color 0.2s ease;
  ${Card}:hover & {
    color: #2563eb;
  }
`;

export const Muted = styled.span`
  color: #6b7280;
`;

export const Description = styled(Muted)`
  font-size: 14px;
  display: block;
  margin-bottom: 12px;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const PriceCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CountText = styled(Muted)`
  font-size: 14px;
`;

export const PriceCurrent = styled.span`
  font-size: 22px;
  font-weight: 800;
  color: #111827;
`;

export const PriceOriginal = styled.span`
  font-size: 14px;
  color: #6b7280;
  text-decoration: line-through;
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const PrimaryBtn = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  color: #fff;
  background: #2563eb;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #1d4ed8;
  }
`;

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #e5e7eb;
  }
`;

export const GridPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
  max-width: 12rem;
`;

export const Thumb = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  padding: 8px;
  img {
    width: 100%;
    height: 48px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 4px;
  }
  p {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
