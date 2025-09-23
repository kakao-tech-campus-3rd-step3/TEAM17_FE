import { useState } from 'react';
import { useAsync, useAsyncActions } from './useAsync';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductLike,
} from '@/api/productApi';
import type { ProductRequest } from '@/types/Product';

// 모든 제품 목록 관리
export const useProducts = () => {
  const {
    data: products,
    loading,
    error,
    execute,
    reset,
  } = useAsync(fetchProducts, {
    initialData: {},
    errorMessage: () => '제품을 불러오는 데 실패했습니다.',
  });

  return {
    products: products || {},
    loading,
    error,
    refresh: execute,
    reset,
  };
};

// 단일 제품 관리
export const useProduct = (id: number) => {
  const {
    data: product,
    loading,
    error,
    execute,
    reset,
  } = useAsync(() => fetchProductById(id), {
    immediate: !!id,
    errorMessage: () => '제품을 불러오는 데 실패했습니다.',
  });

  return {
    product,
    loading,
    error,
    refresh: execute,
    reset,
  };
};

// 제품 CRUD 작업 관리
export const useProductActions = () => {
  const { loading, error, execute, clearError } = useAsyncActions({
    errorMessage: (error: unknown) =>
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
  });

  const create = async (data: ProductRequest) => {
    const result = await execute(() => createProduct(data));
    if (!result) throw new Error('제품 생성에 실패했습니다.');
    return result;
  };

  const update = async (id: number, data: Partial<ProductRequest>) => {
    const result = await execute(() => updateProduct(id, data));
    if (!result) throw new Error('제품 수정에 실패했습니다.');
    return result;
  };

  const remove = async (id: number) => {
    await execute(() => deleteProduct(id));
  };

  const toggleLike = async (id: number) => {
    const result = await execute(() => toggleProductLike(id));
    if (!result) throw new Error('좋아요 처리에 실패했습니다.');
    return result;
  };

  return {
    create,
    update,
    remove,
    toggleLike,
    loading,
    error,
    clearError,
  };
};

// 제품 좋아요 관리
export const useProductLike = (id: number, initialLikeCount: number = 0) => {
  const { loading, error, execute } = useAsync(() => toggleProductLike(id), {
    errorMessage: () => '좋아요 처리에 실패했습니다.',
  });

  // 로컬 상태로 낙관적 업데이트 관리
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = async () => {
    if (loading) return;

    // 낙관적 업데이트
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    // 서버 요청
    const result = await execute();

    if (result) {
      // 성공 시 서버 데이터로 업데이트
      setLikeCount(result.likeCount);
      setIsLiked(result.likeCount > likeCount);
    } else {
      // 실패 시 롤백
      setIsLiked(!newIsLiked);
      setLikeCount(likeCount);
    }
  };

  return {
    likeCount,
    isLiked,
    loading,
    error,
    toggleLike: handleToggleLike,
  };
};
