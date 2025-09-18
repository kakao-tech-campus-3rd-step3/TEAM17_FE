import styled from '@emotion/styled';
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
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 16px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const TitleIcon = styled(Package)`
  width: 32px;
  height: 32px;
  color: #2563eb;
`;

export const CategoryTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 0;

  /* 모바일에서 가로 스크롤 */
  @media (max-width: 767px) {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 4px;
    /* 스크롤바 감추기(웹킷) */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CategoryBtn = styled.button<{ active?: boolean }>`
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
  border: 1.5px solid ${({ active }) => (active ? '#f97316' : '#e5e7eb')};
  background: ${({ active }) => (active ? '#fff7ed' : '#ffffff')};
  color: ${({ active }) => (active ? '#f97316' : '#374151')};
  transition: all 0.15s ease;

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
  font-size: 14px;
  white-space: nowrap;
`;

export const Main = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 16px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
