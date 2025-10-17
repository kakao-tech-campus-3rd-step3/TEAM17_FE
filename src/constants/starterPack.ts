export type CategoryKey = '전체' | '베이킹' | '캠핑' | '독서' | '헬스' | '요리' | '러닝';

export const STARTER_PACK_CATEGORIES: CategoryKey[] = [
  '전체',
  '베이킹',
  '캠핑',
  '독서',
  '헬스',
  '요리',
  '러닝',
];

export const STARTER_PACK_CONSTANTS = {
  DEFAULT_CATEGORY: '전체' as CategoryKey,
} as const;
