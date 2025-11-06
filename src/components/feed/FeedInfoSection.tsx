import React from 'react';
import { Heart, MessageSquare, Share, Bookmark, Edit, Trash2 } from 'lucide-react';
import type { FeedDetail } from '@/types/Feed';
import { formatFeedDate } from '@/utils/date';
import { tokens } from '@/styles/tokens';
import {
  InfoContainer,
  UserProfile,
  ProfileImage,
  UserInfo,
  UserName,
  UserBio,
  PostContent,
  PostDate,
  StatsSection,
  StatItem,
  ActionButtons,
  ActionButton,
  HashtagSection,
  Hashtag,
  OwnerActions,
  OwnerButton,
  OwnerDeleteButton,
} from '@/components/feed/FeedInfoSection.styles';

interface FeedInfoSectionProps {
  feed: FeedDetail;
  onLike: () => void;
  onShare: () => void;
  onBookmark: () => void;
  onOpenLikers?: () => void;
  isAuthor?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const FeedInfoSection: React.FC<FeedInfoSectionProps> = ({
  feed,
  onLike,
  onShare,
  onBookmark,
  onOpenLikers,
  isAuthor = false,
  onEdit,
  onDelete,
}) => {
  const handleLikeCountClick = () => {
    if (onOpenLikers && feed.likeCount > 0) {
      onOpenLikers();
    }
  };

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

      {/* 해시태그 */}
      {feed.hashtags && feed.hashtags.length > 0 && (
        <HashtagSection>
          {feed.hashtags.map((tag, index) => {
            const tagName = typeof tag === 'string' ? tag : tag.hashtagName;
            const tagKey = typeof tag === 'string' ? tag : tag.id;
            return <Hashtag key={tagKey || index}>#{tagName}</Hashtag>;
          })}
        </HashtagSection>
      )}

      {/* 통계 섹션 */}
      <StatsSection>
        <StatItem onClick={handleLikeCountClick} $clickable={feed.likeCount > 0}>
          <Heart size={16} />
          {feed.likeCount || 0}개
        </StatItem>
        <StatItem>
          <MessageSquare size={16} />
          {feed.commentCount || 0}개
        </StatItem>
      </StatsSection>

      {/* 액션 버튼 */}
      <ActionButtons>
        <ActionButton onClick={onLike}>
          <Heart
            size={20}
            fill={feed.isLiked ? tokens.colors.orange.primary : 'none'}
            color={tokens.colors.orange.primary}
          />
          좋아요
        </ActionButton>
        <ActionButton onClick={onShare}>
          <Share size={20} />
          공유
        </ActionButton>
        <ActionButton
          onClick={onBookmark}
          type="button"
          aria-label={feed.isBookmarked ? '북마크 취소' : '북마크'}
          aria-pressed={feed.isBookmarked}
        >
          <Bookmark
            size={20}
            fill={feed.isBookmarked ? tokens.colors.orange.primary : 'none'}
            color={tokens.colors.orange.primary}
          />
          북마크
        </ActionButton>
      </ActionButtons>

      <PostDate>{formatFeedDate(feed.createdAt)}</PostDate>

      {isAuthor && (
        <OwnerActions>
          <OwnerButton type="button" onClick={onEdit} aria-label="수정하기">
            <Edit size={18} />
            수정
          </OwnerButton>
          <OwnerDeleteButton type="button" onClick={onDelete} aria-label="삭제하기">
            <Trash2 size={18} />
            삭제
          </OwnerDeleteButton>
        </OwnerActions>
      )}
    </InfoContainer>
  );
};

export default FeedInfoSection;
