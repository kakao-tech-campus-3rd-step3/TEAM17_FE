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
    lists: () => [...QUERY_KEYS.starterPacks.all, 'list'] as const,
    list: () => [...QUERY_KEYS.starterPacks.all] as const,
    details: () => [...QUERY_KEYS.starterPacks.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.starterPacks.details(), id] as const,
  },

  products: {
    all: ['products'] as const,
    lists: () => [...QUERY_KEYS.products.all, 'list'] as const,
    list: () => [...QUERY_KEYS.products.all] as const,
    details: () => [...QUERY_KEYS.products.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.products.details(), id] as const,
  },

  feeds: {
    all: ['feeds'] as const,
    lists: () => [...QUERY_KEYS.feeds.all, 'list'] as const,
    list: (page: number, limit: number) => [...QUERY_KEYS.feeds.lists(), { page, limit }] as const,
    details: () => [...QUERY_KEYS.feeds.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.feeds.details(), id] as const,
    comments: (feedId: number) => [...QUERY_KEYS.feeds.detail(feedId), 'comments'] as const,
  },
} as const;
