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
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TitleIcon = styled(Package)`
  width: 32px;
  height: 32px;
  color: #2563eb; /* lucide는 currentColor 기반이라 color로 제어 */
`;

export const TitleH1 = styled.h1`
  font-size: 28px;
  font-weight: 900;
  margin: 0;
  color: #111827;
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  color: #6b7280;
`;

export const Meta = styled.div`
  color: #6b7280;
  font-size: 14px;
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
