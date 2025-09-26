import styled from 'styled-components';
import { Package } from 'lucide-react';

export const PageWrap = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fafafa, #f3f4f6);
`;

export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
`;

export const HeaderInner = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

export const TitleIcon = styled(Package)`
  width: 2rem;
  height: 2rem;
  color: #2563eb;

  @media (min-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const CategoryTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  min-width: 0;

  @media (min-width: 768px) {
    gap: 0.75rem;
  }

  /* 모바일에서 가로 스크롤 */
  @media (max-width: 47.9375rem) {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.25rem;
    /* 스크롤바 감추기(웹킷) */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CategoryBtn = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.875rem;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.0125rem;
  border: 1.5px solid ${({ active }) => (active ? '#f97316' : '#e5e7eb')};
  background: ${({ active }) => (active ? '#fff7ed' : '#ffffff')};
  color: ${({ active }) => (active ? '#f97316' : '#374151')};
  transition: all 0.15s ease;
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 0.625rem 1rem;
    font-size: 0.9375rem;
  }

  &:hover {
    border-color: #f97316;
    color: #f97316;
    background: #fffaf6;
  }
  &:focus-visible {
    outline: 2px solid #f97316;
    outline-offset: 2px;
  }
`;

export const Meta = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
`;

export const Main = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  @media (min-width: 64rem) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
`;
