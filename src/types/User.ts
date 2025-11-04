export interface UserProfile {
  userId: number;
  nickname: string;
  hobby: string;
  profileImageUrl: string;
  bio: string;
  totalPostCount: number;
  packCount: number;
  feedCount: number;
  packs: PackItem[];
  feeds: FeedItem[];
  bookmarkedFeeds?: FeedItem[];
  isMe: boolean;
}

export type SessionUser = {
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
};

export interface FeedItem {
  feedId: number;
  description: string;
  imageUrl: string;
}

export interface PackItem {
  packId: number;
  name: string;
  mainImageUrl: string;
}
