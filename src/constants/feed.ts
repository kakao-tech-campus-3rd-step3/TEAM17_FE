export const FEED_API_CONSTANTS = {
  DEFAULT_PAGE: 0, // Spring Pageable은 0부터 시작
  DEFAULT_PAGE_SIZE: 10,
} as const;

export const FEED_CONSTANTS = {
  INITIAL_PRODUCT_DISPLAY_COUNT: 3,
  DEFAULT_CATEGORY: '전체',
} as const;

export type FeedCategoryKey = '전체' | '베이킹' | '캠핑' | '독서' | '헬스' | '요리' | '러닝';

export const FEED_CATEGORIES: FeedCategoryKey[] = [
  '전체',
  '베이킹',
  '캠핑',
  '독서',
  '헬스',
  '요리',
  '러닝',
];

export const COMMENT_CONSTANTS = {
  COMMENT_PLACEHOLDER: '댓글을 작성해보세요.',
  REPLY_PLACEHOLDER: '답글을 작성해보세요.',
} as const;
