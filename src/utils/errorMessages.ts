export const ERROR_MESSAGES = {
  FETCH: {
    PRODUCT: '제품을 불러오는 데 실패했습니다.',
    FEED: '피드 정보를 불러오는 데 실패했습니다.',
    STARTER_PACK: '스타터팩을 불러오는 데 실패했습니다.',
    COMMENT: '댓글을 불러오는 데 실패했습니다.',
    COMMENTS: '댓글을 불러오는 데 실패했습니다.',
  },

  ACTION: {
    LIKE: '좋아요 처리에 실패했습니다.',
    BOOKMARK: '북마크 처리에 실패했습니다.',
    CREATE: '생성하는 데 실패했습니다.',
    UPDATE: '수정하는 데 실패했습니다.',
    DELETE: '삭제하는 데 실패했습니다.',
  },
} as const;
