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

export interface LikePostResponse {
  success: boolean;
  likeCount: number;
  isLiked: boolean;
}

// 댓글 타입 정의
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
  replies?: Reply[];
}

export interface Reply {
  replyId: number;
  author: {
    userId: number;
    name: string;
    profileImageUrl: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export interface CreateCommentRequest {
  feedId: number;
  content: string;
}

export interface CreateReplyRequest {
  commentId: number;
  content: string;
}

export interface CommentResponse {
  comments: Comment[];
  totalCount: number;
}

// 피드 상세보기용 확장 타입
export interface FeedDetail extends Omit<FeedPost, 'imageUrl'> {
  imageUrl: string[]; // 캐러셀을 위해 배열로 오버라이드
  comments: Comment[];
  commentCount: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  hashtags: string[];
}
