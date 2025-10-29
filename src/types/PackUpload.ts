export type PackItemInput = {
  name: string;
  linkUrl: string;
  description?: string;
  imageUrl: string;
};

export type UploadPackRequest = {
  categoryId: number;
  name: string;
  price: number;
  mainImageUrl: string;
  description: string;
  items: PackItemInput[];
  hashtagNames: string[];
};

export type UploadPackResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  categoryId: number;
  categoryName: string;
  items: PackItemInput[];
  hashtags: { id: number; hashtagName: string }[];
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  authorNickname: string;
  memberId: number;
};
