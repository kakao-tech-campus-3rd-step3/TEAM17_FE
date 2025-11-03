import React from 'react';
import type { FeedDetail } from '@/types/Feed';
import {
  InfoContainer,
  UserProfile,
  ProfileImage,
  UserInfo,
  UserName,
  UserBio,
  PostContent,
  PostDate,
} from './FeedInfoSection.styles';

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
          <UserName>{feed.author.name}</UserName>
          <UserBio>INFP 감성 빵 제조기입니당~</UserBio>
        </UserInfo>
      </UserProfile>

      {/* 본문 내용 */}
      <PostContent>{feed.description}</PostContent>
      <PostDate>{feed.createdAt}</PostDate>
    </InfoContainer>
  );
};

export default FeedInfoSection;
