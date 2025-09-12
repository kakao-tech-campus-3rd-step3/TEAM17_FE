import styled from '@emotion/styled';

export const Wrap = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #4b5563;
`;

export const Emoji = styled.span`
  background-color: #bfdbfe;
  color: #2563eb;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

export const Button = styled.button`
  font-size: 0.875rem;
  color: #3b82f6;
  margin-left: auto;
  cursor: pointer;
  background: transparent;
  border: 0;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    text-decoration: underline;
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
