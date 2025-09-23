import axiosInstance from './axiosInstance';
import type { Product, ProductResponse, ProductRequest } from '@/types/Product';

// 모든 제품 목록 조회
export const fetchProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>('/api/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('제품 목록을 불러오는데 실패했습니다.');
  }
};

// 특정 제품 조회
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get<Product>(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error('제품 정보를 불러오는데 실패했습니다.');
  }
};

// 제품 생성
export const createProduct = async (data: ProductRequest): Promise<Product> => {
  try {
    const response = await axiosInstance.post<Product>('/api/products', data);
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
    const response = await axiosInstance.put<Product>(`/api/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update product ${id}:`, error);
    throw new Error('제품 수정에 실패했습니다.');
  }
};

// 제품 삭제
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/products/${id}`);
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    throw new Error('제품 삭제에 실패했습니다.');
  }
};

// 제품 좋아요 토글
export const toggleProductLike = async (id: number): Promise<{ likeCount: number }> => {
  try {
    const response = await axiosInstance.post<{ likeCount: number }>(`/api/products/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle like for product ${id}:`, error);
    throw new Error('좋아요 처리에 실패했습니다.');
  }
};
