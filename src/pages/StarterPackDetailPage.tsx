import { useParams, useSearchParams } from 'react-router-dom';
import { useStarterPackById, useStarterPackLike } from '@/hooks/useStarterPacks';
import { mockStartPacks } from '@/mocks/mock';
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
  const [searchParams] = useSearchParams();
  const packId = id ? parseInt(id, 10) : 0;

  // 데모 확인 (URL에 ?demo=true가 있을 때만)
  const isDemoMode = searchParams.get('demo') === 'true';

  const { starterPack, loading, error } = useStarterPackById(packId);
  const { toggleLike } = useStarterPackLike(packId);

  // 데모 모드일 때만 Mock 데이터 사용
  const mockPack = isDemoMode ? mockStartPacks.find((pack) => pack.id === packId) : null;
  const displayPack = starterPack || mockPack;

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

  // 에러 상태 처리 (데모 모드가 아닐 때만 에러 표시)
  if (!isDemoMode && (error || !starterPack)) {
    return (
      <DetailContainer>
        <ErrorContainer>
          <ErrorMessage>{error || '스타터팩을 찾을 수 없습니다.'}</ErrorMessage>
        </ErrorContainer>
      </DetailContainer>
    );
  }

  // 데모 모드가 아니고 데이터가 없는 경우
  if (!isDemoMode && !starterPack) {
    return (
      <DetailContainer>
        <ErrorContainer>
          <ErrorMessage>스타터팩을 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </DetailContainer>
    );
  }

  // 데모 모드이지만 Mock 데이터도 없는 경우
  if (isDemoMode && !displayPack) {
    return (
      <DetailContainer>
        <ErrorContainer>
          <ErrorMessage>데모용 스타터팩을 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </DetailContainer>
    );
  }

  // 현재 좋아요 상태
  const packWithLike = displayPack as StarterPack & { isLiked?: boolean };
  const isLiked = packWithLike?.isLiked ?? false;

  return (
    <DetailContainer>
      <DetailHeader>
        <DetailTitle>{displayPack?.name}</DetailTitle>
        {isDemoMode && (
          <div
            style={{
              textAlign: 'center',
              padding: '0.5rem',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              fontSize: '0.875rem',
              marginTop: '0.5rem',
            }}
          >
            📝 데모 모드 - Mock 데이터로 표시 중
          </div>
        )}
      </DetailHeader>

      <DetailContent>
        <div>
          <img
            src={displayPack?.mainImage}
            alt={displayPack?.name}
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>상품 정보</h2>
          <p>{displayPack?.description}</p>
          <p>카테고리: {displayPack?.category}</p>
          <p>좋아요: {displayPack?.likes}개</p>

          <button
            onClick={() => toggleLike()}
            disabled={isDemoMode}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isLiked ? '#ef4444' : '#f3f4f6',
              color: isLiked ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: isDemoMode ? 'not-allowed' : 'pointer',
              opacity: isDemoMode ? 0.6 : 1,
              marginTop: '1rem',
            }}
          >
            {isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
            {isDemoMode && ' (데모 모드)'}
          </button>
        </div>

        {displayPack?.products && displayPack.products.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2>포함 상품</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {displayPack.products.map((product) => (
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
