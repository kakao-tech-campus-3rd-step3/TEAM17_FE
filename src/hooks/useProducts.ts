import { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductLike,
} from '@/api/productApi';
import type { Product, ProductResponse, ProductRequest } from '@/types/Product';

// 모든 제품 목록 관리
export const useProducts = () => {
  const [products, setProducts] = useState<ProductResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '제품을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const refresh = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    refresh,
  };
};

// 단일 제품 관리
export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '제품을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id, loadProduct]);

  const refresh = useCallback(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    refresh,
  };
};

// 제품 CRUD 작업 관리
export const useProductActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProductRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createProduct(data);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '제품 생성에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, data: Partial<ProductRequest>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await updateProduct(id, data);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '제품 수정에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteProduct(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '제품 삭제에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleLike = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await toggleProductLike(id);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '좋아요 처리에 실패했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    create,
    update,
    remove,
    toggleLike,
    loading,
    error,
  };
};

// 제품 좋아요 관리
export const useProductLike = (id: number, initialLikeCount: number = 0) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = useCallback(async () => {
    if (loading) return;

    // 낙관적 업데이트
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);
    setLoading(true);

    try {
      const result = await toggleProductLike(id);
      setLikeCount(result.likeCount);
      setIsLiked(result.likeCount > likeCount);
    } catch (error) {
      // 실패 시 롤백
      setIsLiked(!newIsLiked);
      setLikeCount(likeCount);
      console.error('Failed to toggle like:', error);
    } finally {
      setLoading(false);
    }
  }, [id, isLiked, likeCount, loading]);

  return {
    likeCount,
    isLiked,
    loading,
    toggleLike: handleToggleLike,
  };
};
