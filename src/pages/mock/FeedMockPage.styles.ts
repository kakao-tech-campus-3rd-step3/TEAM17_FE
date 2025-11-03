import styled from 'styled-components';

export const MockPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const MockPageHeader = styled.div`
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MockPageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const MockSection = styled.section`
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MockSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #eee;
`;

export const MockPageDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const MockGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
`;
