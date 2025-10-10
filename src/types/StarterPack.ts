import type { Product } from './Product';

export interface StarterPack {
  id: number;
  name: string;
  cost: number;
  description: string;
  parts: string[][];
  likes: number;

  // 현재 UI에서 사용하는 추가 필드들 (백엔드랑 논의해서 수정)
  mainImage: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  products: Product[];
  reviewCount: number;
  category: string;
}

export interface StarterPackResponse {
  [key: string]: StarterPack[];
}

export interface StarterPackRequest {
  name?: string;
  cost?: number;
  description?: string;
  parts?: string[][];
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
  likes: number;
  isLiked: boolean;
}
