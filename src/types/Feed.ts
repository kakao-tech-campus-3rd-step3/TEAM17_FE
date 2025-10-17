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
  isLiked: boolean;
  createdAt: string;
  products: {
    productId: number;
    name: string;
    imageUrl: string;
    description: string;
  }[];
}

export interface PageableResponse {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface FeedResponse {
  content: FeedPost[];
  pageable: PageableResponse;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number; // 현재 페이지 번호 (0부터 시작)
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
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

export interface LikePostResponse {
  success: boolean;
  likeCount: number;
  isLiked: boolean;
}

export interface Comment {
  commentId: number;
  author: {
    userId: number;
    name: string;
    profileImageUrl: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  parentId?: number | null;
  replies?: Comment[];
}

export interface Reply extends Comment {
  replyId?: number;
}

export interface CreateCommentRequest {
  feedId: number;
  content: string;
  parentId?: number | null;
}

export interface CreateReplyRequest {
  feedId: number;
  commentId: number;
  content: string;
}

export interface CommentResponse {
  content: Comment[];
  pageable: PageableResponse;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// 피드 상세보기용 확장 타입
export interface FeedDetail extends Omit<FeedPost, 'imageUrl'> {
  imageUrl: string[];
  comments: Comment[];
  commentCount: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  hashtags: string[];
}
