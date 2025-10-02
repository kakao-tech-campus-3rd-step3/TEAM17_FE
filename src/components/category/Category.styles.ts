import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrap = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition:
    transform 0.08s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    border-color: #f97316;
  }
  &:focus-visible {
    outline: 2px solid #f97316;
    outline-offset: 2px;
  }

  &[aria-current='page'] {
    border-color: #f97316;
    background: #fff7ed;
  }
`;

export const IconBox = styled.span`
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #374151;
`;
