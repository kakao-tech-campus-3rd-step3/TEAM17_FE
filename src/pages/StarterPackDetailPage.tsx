import { useParams } from 'react-router-dom';
import { useStarterPackById, useStarterPackLike } from '@/hooks/useStarterPacks';
import type { StarterPack } from '@/types/StarterPack';
import {
  DetailContainer,
  DetailHeader,
  DetailTitle,
  DetailContent,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
} from './StarterPackDetailPage.styles';

const StarterPackDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const packId = id ? parseInt(id, 10) : 0;

  const { starterPack, loading, error } = useStarterPackById(packId);
  const { toggleLike } = useStarterPackLike(packId);

  // 로딩 상태 처리
  if (loading) {
    return (
      <DetailContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </DetailContainer>
    );
  }

  // 에러 상태 처리
  if (error || !starterPack) {
    return (
      <DetailContainer>
        <ErrorContainer>
          <ErrorMessage>{error || '스타터팩을 찾을 수 없습니다.'}</ErrorMessage>
        </ErrorContainer>
      </DetailContainer>
    );
  }

  // 현재 좋아요 상태
  const packWithLike = starterPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  return (
    <DetailContainer>
      <DetailHeader>
        <DetailTitle>{starterPack.name}</DetailTitle>
      </DetailHeader>

      <DetailContent>
        <div>
          <img
            src={starterPack.mainImage}
            alt={starterPack.name}
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>상품 정보</h2>
          <p>{starterPack.description}</p>
          <p>카테고리: {starterPack.category}</p>
          <p>좋아요: {starterPack.likes}개</p>

          <button
            onClick={() => toggleLike()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isLiked ? '#ef4444' : '#f3f4f6',
              color: isLiked ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            {isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
          </button>
        </div>

        {starterPack.products && starterPack.products.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2>포함 상품</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {starterPack.products.map((product) => (
                <div
                  key={product.id}
                  style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '0.5rem' }}
                >
                  <img
                    src={product.src}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      marginBottom: '0.5rem',
                    }}
                  />
                  <h3>{product.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </DetailContent>
    </DetailContainer>
  );
};

export default StarterPackDetailPage;
