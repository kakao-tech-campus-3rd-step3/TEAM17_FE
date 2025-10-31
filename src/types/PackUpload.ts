// ==================== 요청 타입 ====================
export type PackItemInput = {
  /** 상품명 */
  name: string;
  /** 상품 링크 URL */
  linkUrl: string;
  /** 상품 설명 (선택) */
  description?: string;
  /** S3 업로드된 상품 이미지 URL */
  imageUrl: string;
};

export type UploadPackRequest = {
  /** 카테고리 ID */
  categoryId: number;
  /** 스타터팩 이름 */
  name: string;
  /** 가격 */
  price: number;
  /** 대표 이미지 URL (S3) */
  mainImageUrl: string;
  /** 설명 */
  description: string;
  /** 상품 리스트 */
  items: PackItemInput[];
  /** 해시태그 목록 */
  hashtagNames: string[];
};

// ==================== 응답 타입 ====================
export type UploadPackResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  categoryId: number;
  categoryName: string;
  items: PackItemInput[];
  hashtags: {
    id: number;
    hashtagName: string;
  }[];
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  authorNickname: string;
  memberId: number;
};
