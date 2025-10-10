export interface Pack {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  link: string;
  productType: string;
  src: string;
  cost: number;
  likeCount: number;
  categoryId: number;
  categoryName: string;
  packs: Pack[];
}

export interface ProductResponse {
  [key: string]: Product[]; // 카테고리별로 그룹화된 제품들
}

export interface ProductRequest {
  name?: string;
  link?: string;
  productType?: string;
  src?: string;
  cost?: number;
  categoryId?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface LikeProductResponse {
  success: boolean;
  likeCount: number;
  isLiked: boolean;
}
