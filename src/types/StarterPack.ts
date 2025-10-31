import type { Product } from './Product';

export interface StarterPack {
  packId: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  productIds: number[];
  likeCount: number;
  isLiked: boolean;
  createdAt: string;

  products?: Product[];
  mainImage?: string;
  originalPrice?: number;
  salePrice?: number;
  discountRate?: number;
  reviewCount?: number;
  commentCount?: number;
}

export interface StarterPackResponse {
  [key: string]: StarterPack[];
}

export interface StarterPackRequest {
  name: string;
  description?: string;
  categoryId: number;
  productIds: number[];
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// 에러 타입
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface LikeStarterPackResponse {
  success: boolean;
  likeCount: number;
  isLiked: boolean;
}

export interface BookmarkStarterPackResponse {
  isBookmarked: boolean;
  bookmarkCount: number;
}

// 페이지네이션 공통 타입
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

// 스타터팩 좋아요 사용자 정보
export interface PackLikerResponse {
  userId: number;
  name: string;
  profileImageUrl: string;
}

// 스타터팩 좋아요 목록 응답
export interface PagePackLikerResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableResponse;
  numberOfElements: number;
  size: number;
  content: PackLikerResponse[];
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

// 스타터팩 댓글 작성자 정보
export interface AuthorInfo {
  id: number;
  name: string;
  profileImageUrl: string;
}

// 스타터팩 댓글 응답
export interface PackCommentResponse {
  id: number;
  parentId: number | null;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: AuthorInfo;
  isMine: boolean;
}

// 스타터팩 댓글 목록 응답
export interface PagePackCommentResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableResponse;
  numberOfElements: number;
  size: number;
  content: PackCommentResponse[];
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
