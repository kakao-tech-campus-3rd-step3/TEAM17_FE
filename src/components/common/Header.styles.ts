import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const baseButtonStyles = css`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderWrap = styled.header`
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

export const Brand = styled.div`
  color: #f97316;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const GhostButton = styled.button`
  ${baseButtonStyles};
  color: #4b5563;
  background: transparent;

  &:hover {
    color: #f97316;
  }
`;

export const GhostLink = styled(Link)`
  ${baseButtonStyles};
  color: #4b5563;
  background: transparent;
  text-decoration: none;

  &:hover {
    color: #f97316;
  }
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles};
  color: #ffffff;
  background-color: #f97316;

  &:hover {
    background-color: #ea580c;
  }
`;

export const PrimaryLink = styled(Link)`
  ${baseButtonStyles};
  color: #ffffff;
  background-color: #f97316;
  text-decoration: none;

  &:hover {
    background-color: #ea580c;
  }
`;

export const IconButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: #f3f4f6;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
  background: #e5e7eb;
`;

export const LogoutButton = styled.button`
  ${baseButtonStyles};
  color: #ffffff;
  background-color: #111827;

  &:hover {
    background-color: #0b1220;
  }
`;
