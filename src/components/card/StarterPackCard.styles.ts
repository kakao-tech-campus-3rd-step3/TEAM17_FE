import styled from 'styled-components';
import { Heart, Eye, Star } from 'lucide-react';

export const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-0.375rem);
    box-shadow: 0 1rem 2.25rem rgba(0, 0, 0, 0.12);
  }
`;

export const LikeButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(0.375rem);
  box-shadow: 0 0.375rem 1rem rgba(0, 0, 0, 0.12);
  cursor: pointer;

  &:hover {
    background: #fff;
  }
`;

export const HeartIcon = styled(Heart)<{ $liked?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ $liked }) => ($liked ? '#ef4444' : '#9ca3af')};
  fill: ${({ $liked }) => ($liked ? '#ef4444' : 'none')};
  transition: color 0.2s ease, fill 0.2s ease;
`;

export const DiscountBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  background: #ef4444;
  color: #fff;
  padding: 0.375rem 0.625rem;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const ImageWrap = styled.div`
  position: relative;
  height: 16rem;
  overflow: hidden;
  cursor: pointer;

  @media (min-width: 768px) {
    height: 18rem;
  }
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
  width: 2rem;
  height: 2rem;
  display: block;
  margin: 0 auto 0.5rem;
`;

export const MoreText = styled.div`
  opacity: 0.8;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

export const Content = styled.div`
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 1.75rem;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const CategoryPill = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563eb;
  background: #dbeafe;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const StarIcon = styled(Star)`
  width: 1rem;
  height: 1rem;
  color: #f59e0b;
  fill: #f59e0b;
`;

export const Title = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  transition: color 0.2s ease;

  @media (min-width: 768px) {
    font-size: 1.375rem;
  }

  ${Card}:hover & {
    color: #2563eb;
  }
`;

export const Muted = styled.span`
  color: #6b7280;
`;

export const Description = styled(Muted)`
  font-size: 0.875rem;
  display: block;
  margin-bottom: 0.75rem;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const PriceCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CountText = styled(Muted)`
  font-size: 0.875rem;
`;

export const PriceCurrent = styled.span`
  font-size: 1.375rem;
  font-weight: 800;
  color: #111827;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const PriceOriginal = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: line-through;
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const PrimaryBtn = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 700;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  border: none;
  color: #fff;
  background: #2563eb;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background: #1d4ed8;
  }
`;

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
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
  gap: 0.5rem;
  margin-top: 0.75rem;
  max-width: 12rem;
`;

export const Thumb = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.375rem);
  border-radius: 0.5rem;
  padding: 0.5rem;

  img {
    width: 100%;
    height: 3rem;
    object-fit: cover;
    border-radius: 0.375rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
