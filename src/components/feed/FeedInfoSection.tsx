import React from 'react';
import type { FeedDetail } from '@/types/Feed';
import { formatFeedDate } from '@/utils/date';
import {
  InfoContainer,
  UserProfile,
  ProfileImage,
  UserInfo,
  UserName,
  UserBio,
  PostContent,
  PostDate,
} from '@/components/feed/FeedInfoSection.styles';

interface FeedInfoSectionProps {
  feed: FeedDetail;
}

const FeedInfoSection: React.FC<FeedInfoSectionProps> = ({ feed }) => {
  return (
    <InfoContainer>
      {/* 유저 프로필 섹션 */}
      <UserProfile>
        <ProfileImage src={feed.author.profileImageUrl} alt={feed.author.name} />
        <UserInfo>
          <UserName>{feed.author.nickname || feed.author.name}</UserName>
          {feed.author.bio && <UserBio>{feed.author.bio}</UserBio>}
        </UserInfo>
      </UserProfile>

      {/* 본문 내용 */}
      <PostContent>{feed.description}</PostContent>
      <PostDate>{formatFeedDate(feed.createdAt)}</PostDate>
    </InfoContainer>
  );
};

export default FeedInfoSection;
