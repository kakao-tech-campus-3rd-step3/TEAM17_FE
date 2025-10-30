import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrap = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  background: #fff;
  border-radius: 12px;
`;

export const Item = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #f97316;
    outline-offset: 4px;
    border-radius: 8px;
  }
`;

export const IconBox = styled.span`
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff7ed;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3000%) hue-rotate(0deg)
    brightness(100%) contrast(100%);
  transition: filter 0.2s ease;

  ${Item}[aria-current='page'] & {
    filter: brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3000%) hue-rotate(0deg)
      brightness(100%) contrast(100%);
  }
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: #374151;
  text-align: center;
  transition: color 0.2s ease;

  ${Item}[aria-current='page'] & {
    color: #f97316;
    font-weight: 700;
  }
`;
