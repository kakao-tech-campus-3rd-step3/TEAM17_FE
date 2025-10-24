export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    login: ['auth', 'login'] as const,
    signup: ['auth', 'signup'] as const,
    user: ['auth', 'user'] as const,
    logout: ['auth', 'logout'] as const,
  },

  starterPacks: {
    all: ['starterPacks'] as const,
    list: ['starterPacks', 'list'] as const,
    detail: (id: number) => ['starterPacks', 'detail', id] as const,
  },

  products: {
    all: ['products'] as const,
    list: ['products', 'list'] as const,
    detail: (id: number) => ['products', 'detail', id] as const,
  },

  feeds: {
    all: ['feeds'] as const,
    lists: ['feeds', 'list'] as const,
    list: (page: number, limit: number) => ['feeds', 'list', { page, limit }] as const,
    detail: (id: number) => ['feeds', 'detail', id] as const,
    comments: (feedId: number) => ['feeds', 'detail', feedId, 'comments'] as const,
  },

  user: {
    all: ['user'] as const,
    profile: () => [...QUERY_KEYS.user.all, 'profile'] as const,
  },
} as const;
