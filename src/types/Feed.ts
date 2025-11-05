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
  isMine?: boolean;
  isDeleted?: boolean;
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

export interface Member {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  provider: 'EMAIL' | 'GOOGLE' | 'KAKAO' | 'NAVER';
  profileImageUrl: string;
  role: 'USER' | 'ADMIN';
  birthDate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  hobby: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

// 피드 상세보기용 확장 타입
export interface FeedProduct {
  productId?: number;
  id?: number;
  name: string;
  description?: string;
  linkUrl?: string;
}

export interface FeedHashtag {
  id: number;
  hashtagName: string;
}

export interface FeedDetail extends Omit<FeedPost, 'imageUrl' | 'author'> {
  imageUrl: string[];
  author: Member;
  comments: Comment[];
  commentCount: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  hashtags: FeedHashtag[] | string[];
  products?: FeedProduct[];
}

// 피드 좋아요 사용자 정보
export interface FeedLikerResponse {
  userId: number;
  name: string;
  profileImageUrl: string;
}

// 피드 좋아요 목록 응답
export interface PageFeedLikerResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableResponse;
  numberOfElements: number;
  size: number;
  content: FeedLikerResponse[];
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
