import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrap = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  padding: 1.25rem 1rem;
  background: #fff;
  border-radius: 0.75rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 1rem 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0.75rem 0.5rem;
  }
`;

export const Item = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-0.125rem);
  }

  &:focus-visible {
    outline: 0.125rem solid #f97316;
    outline-offset: 0.25rem;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.375rem;
    padding: 0.125rem;
  }
`;

export const IconBox = styled.span`
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff7ed;

  @media (max-width: 768px) {
    width: 2.75rem;
    height: 2.75rem;
  }

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3000%) hue-rotate(0deg)
    brightness(100%) contrast(100%);
  transition: filter 0.2s ease;

  @media (max-width: 768px) {
    width: 1.375rem;
    height: 1.375rem;
  }

  @media (max-width: 480px) {
    width: 1.25rem;
    height: 1.25rem;
  }

  ${Item}[aria-current='page'] & {
    filter: brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3000%) hue-rotate(0deg)
      brightness(100%) contrast(100%);
  }
`;

export const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.0125rem;
  color: #374151;
  text-align: center;
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    font-size: 0.6875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.625rem;
  }

  ${Item}[aria-current='page'] & {
    color: #f97316;
    font-weight: 700;
  }
`;
