import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedMediaSection from '@/components/feed/FeedMediaSection';
import FeedInfoSection from '@/components/feed/FeedInfoSection';
import CommentSection from '@/components/feed/CommentSection';
import type { FeedDetail, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import {
  FeedDetailPageContainer,
  PageHeader,
  PageTitle,
  BackButton,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorMessage,
  ContentContainer,
  TopSection,
  LeftColumn,
  RightColumn,
  BottomSection,
} from './FeedDetailPage.styles';

// 임시 목업 데이터 (실제로는 API에서 가져와야 함)
const MOCK_FEED_DETAIL: FeedDetail = {
  feedId: 1,
  author: {
    userId: 1,
    name: '빵수니',
    profileImageUrl:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face',
  },
  description: `곧 다가오는 크리스마스를 맞이하여 크리스마스 쿠키를 만들어 보았어요~~
크리스마스 느낌으로 꾸며보았는데 어떤가요??
제 레시피를 알고 싶으시다면 댓글로 적어 드릴게요!`,
  imageUrl: [
    'https://images.unsplash.com/photo-1578985545062-69928b1c9587?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578985545062-69928b1c9587?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  ],
  feedType: 'INFO',
  category: {
    categoryId: 1,
    categoryName: '베이킹',
  },
  likeCount: 111,
  isLiked: false,
  createdAt: '2025.12.01',
  products: [
    {
      productId: 1,
      name: '스프링클 슈가스트랜드칼라 25g',
      imageUrl: '/api/placeholder/60/60',
      description: '스프링클을 사용하면 더 이쁘게 만들어집니다~',
    },
    {
      productId: 2,
      name: '초코펜다크(데코펜)',
      imageUrl: '/api/placeholder/60/60',
      description: '쿠키 장식에 필수 아이템',
    },
  ],
  comments: [
    {
      commentId: 1,
      author: {
        userId: 2,
        name: '질문폭격기',
        profileImageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      },
      content: '이 레시피 알려주실 수 있나요?',
      createdAt: '2025.12.01',
      likeCount: 40,
      isLiked: false,
      replies: [
        {
          replyId: 1,
          author: {
            userId: 1,
            name: '빵수니',
            profileImageUrl:
              'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=24&h=24&fit=crop&crop=face',
          },
          content: `기본 쿠키 레시피 (약 20개 분량)

재료:
- 버터 100g (실온에서 부드럽게)
- 설탕 80g
- 달걀 1개
- 박력분(또는 중력분) 180g
- 베이킹파우더 1작은술 (선택)
- 바닐라 에센스 약간 (선택)

만드는 법:
1. 버터 + 설탕
볼에 버터와 설탕을 넣고 핸드믹서 또는 거품기로 크림처럼 되도록 섞어주세요. (색이 약간 연해지면 OK)....`,
          createdAt: '2025.12.01',
          likeCount: 40,
          isLiked: false,
        },
      ],
    },
    {
      commentId: 2,
      author: {
        userId: 3,
        name: '장비파',
        profileImageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      },
      content: '쓰시는 쿠키틀 중에 좋은 것 추천해주실 수 있나요? 저 쿠키틀은 가지고 있어서요..!',
      createdAt: '2025.12.01',
      likeCount: 40,
      isLiked: false,
      replies: [],
    },
  ],
  commentCount: 9,
  bookmarkCount: 20,
  isBookmarked: false,
  hashtags: ['크리스마스', '쿠키', '솔로', '베이킹'],
};

const FeedDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feed, setFeed] = useState<FeedDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        setFeed(MOCK_FEED_DETAIL);
      } catch (err) {
        setError('피드 상세 정보를 불러오는데 실패했습니다.');
        console.error('Failed to load feed detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadFeedDetail();
    }
  }, [id]);

  const handleLike = (isLiked: boolean, likeCount: number) => {
    if (feed) {
      setFeed((prev) => (prev ? { ...prev, isLiked, likeCount } : null));
    }
  };

  const handleBookmark = (isBookmarked: boolean, bookmarkCount: number) => {
    if (feed) {
      setFeed((prev) => (prev ? { ...prev, isBookmarked, bookmarkCount } : null));
    }
  };

  const handleAddComment = (comment: CreateCommentRequest) => {
    // TODO: API 호출
    console.log('Adding comment:', comment);
  };

  const handleAddReply = (reply: CreateReplyRequest) => {
    // TODO: API 호출
    console.log('Adding reply:', reply);
  };

  const handleLikeComment = (commentId: number, isLiked: boolean, likeCount: number) => {
    if (feed) {
      const updatedComments = feed.comments.map((comment) =>
        comment.commentId === commentId ? { ...comment, isLiked, likeCount } : comment
      );
      setFeed((prev) => (prev ? { ...prev, comments: updatedComments } : null));
    }
  };

  const handleLikeReply = (replyId: number, isLiked: boolean, likeCount: number) => {
    if (feed) {
      const updatedComments = feed.comments.map((comment) => ({
        ...comment,
        replies:
          comment.replies?.map((reply) =>
            reply.replyId === replyId ? { ...reply, isLiked, likeCount } : reply
          ) || [],
      }));
      setFeed((prev) => (prev ? { ...prev, comments: updatedComments } : null));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </FeedDetailPageContainer>
    );
  }

  if (error) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </FeedDetailPageContainer>
    );
  }

  if (!feed) {
    return (
      <FeedDetailPageContainer>
        <PageHeader>
          <BackButton onClick={handleBack}>←</BackButton>
          <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
        </PageHeader>
        <ErrorContainer>
          <ErrorMessage>피드를 찾을 수 없습니다.</ErrorMessage>
        </ErrorContainer>
      </FeedDetailPageContainer>
    );
  }

  return (
    <FeedDetailPageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>←</BackButton>
        <PageTitle>취미 꾸미기 피드 상세보기</PageTitle>
      </PageHeader>

      <ContentContainer>
        <TopSection>
          <LeftColumn>
            <FeedMediaSection feed={feed} onLike={handleLike} onBookmark={handleBookmark} />
          </LeftColumn>

          <RightColumn>
            <FeedInfoSection feed={feed} />
          </RightColumn>
        </TopSection>

        <BottomSection>
          <CommentSection
            comments={feed.comments}
            feedId={feed.feedId}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
          />
        </BottomSection>
      </ContentContainer>
    </FeedDetailPageContainer>
  );
};

export default FeedDetailPage;
