import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductLike,
} from '@/api/productApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { ERROR_MESSAGES } from '@/utils/errorMessages';
import type {
  Product,
  ProductResponse,
  ProductRequest,
  LikeProductResponse,
} from '@/types/Product';

// 상수 관리
const MIN_VALID_ID = 1;

// ==================== Product 목록 조회 ====================

// 모든 제품 목록 관리
export const useProducts = () => {
  const {
    data: products = {},
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.products.list,
    queryFn: fetchProducts,
    throwOnError: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.products.all });
  };

  return {
    products,
    loading,
    error: error ? ERROR_MESSAGES.FETCH.PRODUCT : null,
    refresh: refetch,
    reset,
  };
};

// ==================== Product 상세 조회 ====================

// 단일 제품 관리
export const useProduct = (id: number | undefined) => {
  const isValidId = !!id && id >= MIN_VALID_ID;

  const {
    data: product,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: isValidId ? QUERY_KEYS.products.detail(id) : ['products', 'detail', 'invalid'],
    queryFn: isValidId ? () => fetchProductById(id) : undefined,
    enabled: isValidId,
    throwOnError: false,
  });

  const queryClient = useQueryClient();

  const reset = () => {
    if (isValidId) {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.products.detail(id) });
    }
  };

  return {
    product,
    loading,
    error: error ? ERROR_MESSAGES.FETCH.PRODUCT : null,
    refresh: refetch,
    reset,
  };
};

// ==================== Product CRUD 작업 ====================

// 제품 CRUD 작업 관리
export const useProductActions = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.list });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProductRequest> }) =>
      updateProduct(id, data),
    onSuccess: (updatedProduct, { id }) => {
      queryClient.setQueryData(QUERY_KEYS.products.detail(id), updatedProduct);

      queryClient.setQueryData(QUERY_KEYS.products.list, (old: ProductResponse | undefined) => {
        if (!old) return old;

        const updated: ProductResponse = {};
        for (const key in old) {
          updated[key] = old[key].map((product) => (product.id === id ? updatedProduct : product));
        }
        return updated;
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.products.detail(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.list });
    },
  });

  const create = async (data: ProductRequest) => {
    return createMutation.mutateAsync(data);
  };

  const update = async (id: number, data: Partial<ProductRequest>) => {
    return updateMutation.mutateAsync({ id, data });
  };

  const remove = async (id: number) => {
    return deleteMutation.mutateAsync(id);
  };

  const loading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const error =
    createMutation.error?.message ||
    updateMutation.error?.message ||
    deleteMutation.error?.message ||
    null;

  const clearError = () => {
    createMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
  };

  return {
    create,
    update,
    remove,
    loading,
    error,
    clearError,
  };
};

// ==================== Product 좋아요 관리 ====================

// 제품 좋아요 관리
export const useProductLike = (id: number) => {
  const queryClient = useQueryClient();

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleProductLike(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.products.detail(id) });

      const previousProduct = queryClient.getQueryData(QUERY_KEYS.products.detail(id));

      queryClient.setQueryData(QUERY_KEYS.products.detail(id), (old: Product | undefined) => {
        if (!old) return old;
        const currentIsLiked = (old as Product & { isLiked?: boolean }).isLiked ?? false;
        return {
          ...old,
          isLiked: !currentIsLiked,
          likeCount: currentIsLiked ? Math.max(0, old.likeCount - 1) : old.likeCount + 1,
        };
      });

      queryClient.setQueryData(QUERY_KEYS.products.list, (old: ProductResponse | undefined) => {
        if (!old) return old;

        const updateProduct = (product: Product) => {
          const currentIsLiked = (product as Product & { isLiked?: boolean }).isLiked ?? false;
          return product.id === id
            ? {
                ...product,
                isLiked: !currentIsLiked,
                likeCount: currentIsLiked
                  ? Math.max(0, product.likeCount - 1)
                  : product.likeCount + 1,
              }
            : product;
        };

        const updated: ProductResponse = {};
        for (const key in old) {
          updated[key] = old[key].map(updateProduct);
        }
        return updated;
      });

      return { previousProduct };
    },
    onSuccess: (result: LikeProductResponse) => {
      queryClient.setQueryData(QUERY_KEYS.products.detail(id), (old: Product | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likeCount: result.likeCount,
          isLiked: result.isLiked,
        };
      });

      queryClient.setQueryData(QUERY_KEYS.products.list, (old: ProductResponse | undefined) => {
        if (!old) return old;

        const updateProduct = (product: Product) =>
          product.id === id
            ? { ...product, likeCount: result.likeCount, isLiked: result.isLiked }
            : product;

        const updated: ProductResponse = {};
        for (const key in old) {
          updated[key] = old[key].map(updateProduct);
        }
        return updated;
      });
    },
    onError: (_, __, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(QUERY_KEYS.products.detail(id), context.previousProduct);
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.list });
    },
  });

  const handleToggleLike = () => {
    if (toggleLikeMutation.isPending) return;
    toggleLikeMutation.mutate();
  };

  return {
    toggleLike: handleToggleLike,
    loading: toggleLikeMutation.isPending,
    error: toggleLikeMutation.error ? ERROR_MESSAGES.ACTION.LIKE : null,
  };
};
