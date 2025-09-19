// 피드 관련 타입 정의 (API 스키마 기반)
export interface FeedPost {
  feedId: number;
  author: {
    userId: number;
    name: string;
    profileImageUrl: string;
  };
  description: string;
  imageUrl: string;
  feedType: 'INFO' | 'REVIEW' | 'QUESTION' | 'TIP';
  category: {
    categoryId: number;
    categoryName: string;
  };
  likeCount: number;
  createdAt: string;
  products: {
    productId: number;
    name: string;
    imageUrl: string;
    description: string;
  }[];
}

export interface FeedResponse {
  feeds: FeedPost[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CreatePostRequest {
  description: string;
  imageUrl: string;
  feedType: 'INFO' | 'REVIEW' | 'QUESTION' | 'TIP';
  categoryId: number;
  productIds: number[];
}

export interface LikePostRequest {
  feedId: number;
  isLiked: boolean;
}
