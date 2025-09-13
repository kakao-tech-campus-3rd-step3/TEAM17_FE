import styled from '@emotion/styled';

export const FooterWrap = styled.footer`
  background-color: #1f2937;
  color: #ffffff;
  padding: 2rem 1rem;
  margin-top: 2rem;
`;

export const Container = styled.div`
  max-width: 28rem;
  margin: 0 auto;
`;

export const Top = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Brand = styled.div`
  color: #f97316;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const Slogan = styled.p`
  color: #d1d5db;
  font-size: 0.875rem;
`;

export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Column = styled.div``;

export const ColumnTitle = styled.h4`
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

export const List = styled.ul`
  list-style: none;
  padding-left: 0;

  font-size: 0.75rem;
  color: #d1d5db;
  line-height: 1.25rem;

  & > li + li {
    margin-top: 0.25rem;
  }
`;

export const Bottom = styled.div`
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
`;

export const Copy = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
`;
