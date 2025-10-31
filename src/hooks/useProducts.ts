import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/api/productApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { parseAxiosError, createUserFriendlyMessage } from '@/utils/errorHandling';
import type { ProductResponse, ProductRequest } from '@/types/Product';

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
    error: error
      ? createUserFriendlyMessage(parseAxiosError(error), '제품 목록을 불러오는데 실패했습니다.')
      : null,
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
    error: error
      ? createUserFriendlyMessage(parseAxiosError(error), '제품 정보를 불러오는데 실패했습니다.')
      : null,
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

  const error = createMutation.error
    ? createUserFriendlyMessage(
        parseAxiosError(createMutation.error),
        '제품 작업 중 오류가 발생했습니다.'
      )
    : updateMutation.error
      ? createUserFriendlyMessage(
          parseAxiosError(updateMutation.error),
          '제품 수정 중 오류가 발생했습니다.'
        )
      : deleteMutation.error
        ? createUserFriendlyMessage(
            parseAxiosError(deleteMutation.error),
            '제품 삭제 중 오류가 발생했습니다.'
          )
        : null;

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
