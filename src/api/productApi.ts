import axios from 'axios';
import type { Product, ProductResponse, ProductRequest } from '@/types/Product';

// API 기본 설정
const api = axios.create({
  baseURL: 'https://team17be-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 모든 제품 목록 조회
export const fetchProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await api.get<ProductResponse>('/api/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('제품 목록을 불러오는데 실패했습니다.');
  }
};

// 특정 제품 조회
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error('제품 정보를 불러오는데 실패했습니다.');
  }
};

// 제품 생성
export const createProduct = async (data: ProductRequest): Promise<Product> => {
  try {
    const response = await api.post<Product>('/api/products', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw new Error('제품 생성에 실패했습니다.');
  }
};

// 제품 수정
export const updateProduct = async (
  id: number,
  data: Partial<ProductRequest>
): Promise<Product> => {
  try {
    const response = await api.put<Product>(`/api/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update product ${id}:`, error);
    throw new Error('제품 수정에 실패했습니다.');
  }
};

// 제품 삭제
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/products/${id}`);
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    throw new Error('제품 삭제에 실패했습니다.');
  }
};

// 제품 좋아요 토글
export const toggleProductLike = async (id: number): Promise<{ likeCount: number }> => {
  try {
    const response = await api.post<{ likeCount: number }>(`/api/products/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for product ${id}:`, error);
    throw new Error('좋아요 처리에 실패했습니다.');
  }
};
