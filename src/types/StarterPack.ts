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
