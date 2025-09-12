import styled from '@emotion/styled';

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
  font-size: 0.875rem;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  background: transparent;
  border-radius: 0.375rem;
  transition: color 0.2s ease;
  &:hover {
    color: #f97316;
  }
`;

export const PrimaryButton = styled.button`
  font-size: 0.875rem;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  background-color: #f97316;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
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
  font-size: 0.875rem;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  background-color: #111827;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: #0b1220;
  }
`;
