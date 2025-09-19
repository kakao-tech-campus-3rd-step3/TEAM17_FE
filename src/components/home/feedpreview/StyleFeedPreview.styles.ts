import styled from 'styled-components';

export const Wrap = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const Emoji = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
`;

export const Button = styled.button`
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
  cursor: pointer;
  background: transparent;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #3b82f6;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const FeedItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ImageBox = styled.div`
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PlaceholderText = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Icon = styled.div`
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
`;

export const Avatar = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #d1d5db;
  border-radius: 9999px;
`;

export const Username = styled.span`
  color: #4b5563;
`;
