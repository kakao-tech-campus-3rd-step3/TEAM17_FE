export type UserProfile = {
  nickname: string;
  hobby: string;
  profileImageUrl: string;
  bio: string;
  totalPostCount: number;
  packCount: number;
  feedCount: number;
  packs?: {
    packId: number;
    name: string;
    mainImageUrl: string;
  }[];
  feeds?: {
    feedId: number;
    description: string;
    imageUrl: string;
  }[];
  isMe?: boolean;
};


export type User = {
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
};
