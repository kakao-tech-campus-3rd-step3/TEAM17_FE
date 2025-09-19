import type { FeedPost, FeedResponse, LikePostResponse } from '@/types/Feed';

// Mock 카테고리 데이터
const mockCategories = [
  { categoryId: 1, categoryName: '패션' },
  { categoryId: 2, categoryName: '뷰티' },
  { categoryId: 3, categoryName: '라이프스타일' },
  { categoryId: 4, categoryName: '홈데코' },
  { categoryId: 5, categoryName: '푸드' },
];

// Mock 제품 데이터
const mockProducts = [
  {
    productId: 1,
    name: '데님 재킷',
    imageUrl: 'https://picsum.photos/200/200?random=product1',
    description: '클래식한 데님 재킷',
  },
  {
    productId: 2,
    name: '화이트 스니커즈',
    imageUrl: 'https://picsum.photos/200/200?random=product2',
    description: '깔끔한 화이트 스니커즈',
  },
  {
    productId: 3,
    name: '가죽 백팩',
    imageUrl: 'https://picsum.photos/200/200?random=product3',
    description: '고급스러운 가죽 백팩',
  },
  {
    productId: 4,
    name: '실버 목걸이',
    imageUrl: 'https://picsum.photos/200/200?random=product4',
    description: '세련된 실버 목걸이',
  },
  {
    productId: 5,
    name: '니트 스웨터',
    imageUrl: 'https://picsum.photos/200/200?random=product5',
    description: '따뜻한 니트 스웨터',
  },
];

// Mock 사용자 데이터
const mockUsers = [
  {
    userId: 1,
    name: 'style_master',
    profileImageUrl: 'https://picsum.photos/150/150?random=user1',
  },
  {
    userId: 2,
    name: 'trend_setter',
    profileImageUrl: 'https://picsum.photos/150/150?random=user2',
  },
  {
    userId: 3,
    name: 'fashion_lover',
    profileImageUrl: 'https://picsum.photos/150/150?random=user3',
  },
  {
    userId: 4,
    name: 'outfit_daily',
    profileImageUrl: 'https://picsum.photos/150/150?random=user4',
  },
  { userId: 5, name: 'style_guide', profileImageUrl: 'https://picsum.photos/150/150?random=user5' },
];

export const generateMockFeedPosts = (count: number = 20): FeedPost[] => {
  const posts: FeedPost[] = [];
  const feedTypes: ('INFO' | 'REVIEW' | 'QUESTION' | 'TIP')[] = [
    'INFO',
    'REVIEW',
    'QUESTION',
    'TIP',
  ];
  const descriptions = [
    '오늘의 스타일링을 공유해요! 이 조합이 정말 마음에 들어요 ✨',
    '새로 산 아이템으로 코디해봤는데 어떠세요?',
    '이번 시즌 트렌드 아이템 추천드려요!',
    '집에서도 예쁘게 입고 싶어서 코디해봤어요',
    '친구들과 만날 때 입을 옷 고민 중이에요',
    '이 브랜드 제품들 정말 좋더라고요!',
    '요즘 유행하는 스타일로 도전해봤어요',
    '캐주얼하면서도 세련된 느낌의 코디',
  ];

  for (let i = 1; i <= count; i++) {
    const user = mockUsers[(i - 1) % mockUsers.length];
    const category = mockCategories[(i - 1) % mockCategories.length];
    const feedType = feedTypes[(i - 1) % feedTypes.length];
    const description = descriptions[(i - 1) % descriptions.length];

    const selectedProducts = mockProducts.slice(0, 2);

    posts.push({
      feedId: i,
      author: user,
      description,
      imageUrl: `https://picsum.photos/600/600?random=${i}`,
      feedType,
      category,
      likeCount: 100 + i * 50,
      isLiked: i % 3 === 0,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      products: selectedProducts,
    });
  }

  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const generateMockFeedResponse = (page: number = 1, limit: number = 10): FeedResponse => {
  const allFeeds = generateMockFeedPosts(50);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const feeds = allFeeds.slice(startIndex, endIndex);

  return {
    feeds,
    totalCount: allFeeds.length,
    currentPage: page,
    totalPages: Math.ceil(allFeeds.length / limit),
    hasNext: endIndex < allFeeds.length,
    hasPrevious: page > 1,
  };
};

export const fetchFeedPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<FeedResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return generateMockFeedResponse(page, limit);
};

export const likePost = async (feedId: number, isLiked: boolean): Promise<LikePostResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 실제 mock 데이터에서 해당 피드의 현재 좋아요 수를 기반으로 계산
  const allFeeds = generateMockFeedPosts(50);
  const targetFeed = allFeeds.find((feed) => feed.feedId === feedId);
  const currentLikes = targetFeed ? targetFeed.likeCount : 100 + feedId * 50;
  const newLikeCount = isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

  return {
    success: true,
    likeCount: newLikeCount,
    isLiked,
  };
};
