import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const StarterPackDetailPageContainer = styled.div`
  min-height: 100vh;
  background: ${tokens.colors.background.lightGray};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: ${tokens.colors.background.card};
  border-bottom: 1px solid ${tokens.colors.line.lightGray};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  color: ${tokens.colors.text.black};

  &:hover {
    background: ${tokens.colors.orange.muted};
    color: ${tokens.colors.orange.primary};
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  flex: 1;
  text-align: left;
`;

export const ContentContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
  align-items: flex-start;
  min-height: calc(100vh - 5rem);
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
`;

export const LoadingSpinner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.25rem solid #f3f3f3;
  border-top: 0.25rem solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: left;
  margin: 0;
`;

// StarterPack 전용 컴포넌트들
export const MediaSection = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const MediaImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 40rem;
  object-fit: cover;
  display: block;
`;

export const InfoSection = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

export const StarterPackHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: #262626;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #262626;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

export const StarterPackTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.5rem 0;
`;

export const StarterPackDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  color: #262626;
  margin: 0 0 1rem 0;
`;

export const CategoryTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: #f0f8ff;
  color: #0095f6;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #8e8e8e;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #262626;
  transition: color 0.2s ease;

  &:hover {
    color: #8e8e8e;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProductsSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dbdbdb;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 1rem 0;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const ProductCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const ProductName = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #262626;
  margin: 0;
  text-align: center;
`;

export const TimeStamp = styled.div`
  font-size: 0.625rem;
  color: #8e8e8e;
  text-transform: uppercase;
  letter-spacing: 0.0125rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dbdbdb;
`;
