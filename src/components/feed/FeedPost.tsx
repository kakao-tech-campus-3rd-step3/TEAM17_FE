import { Heart, MessageSquare, MoreHorizontal, Bookmark, Tag } from 'lucide-react';
import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FeedPost as FeedPostType } from '@/types/Feed';
import { tokens } from '@/styles/tokens';
import {
  PostContainer,
  PostHeader,
  UserInfo,
  Avatar,
  Username,
  MoreButton,
  PostImage,
  PostActions,
  EngagementItem,
  EngagementIcon,
  EngagementCount,
  BookmarkButton,
  Caption,
  TimeStamp,
  CategoryTag,
  FeedTypeTag,
} from './FeedPost.styles';

interface FeedPostProps {
  post: FeedPostType;
  onLike?: (feedId: number, isLiked: boolean, likeCount: number) => void | Promise<void>;
}

const FeedPost = ({ post, onLike }: FeedPostProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);

  const handleLike = useCallback(async () => {
    const oldIsLiked = isLiked;
    const oldLikeCount = likeCount;
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    if (onLike) {
      try {
        await onLike(post.feedId, newIsLiked, newLikeCount);
      } catch (error) {
        setIsLiked(oldIsLiked);
        setLikeCount(oldLikeCount);
        console.error('Failed to toggle like:', error);
      }
    }
  }, [isLiked, likeCount, post.feedId, onLike]);

  const handlePostClick = useCallback(() => {
    navigate(`/feed/${post.feedId}`);
  }, [navigate, post.feedId]);

  //프로필 클릭 시 마이페이지 이동
  const handleProfileClick = useCallback(() => {
    navigate(`/mypage/${post.author.userId}`, { state: { hideScrap: true } });
  }, [navigate, post.author.userId]);

  const formatTimeAgo = useCallback((dateString: string): string => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

    if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }, []);

  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <Avatar
            src={post.author.profileImageUrl}
            alt={post.author.name}
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }} 
          />
          <Username onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            @{post.author.name}
          </Username>
        </UserInfo>
        <MoreButton>
          <MoreHorizontal size={20} />
        </MoreButton>
      </PostHeader>

      <PostImage
        src={post.imageUrl}
        alt={`Post by ${post.author.name}`}
        onClick={handlePostClick}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <PostActions>
        <EngagementItem>
          <EngagementIcon
            onClick={handleLike}
            role="button"
            aria-label={isLiked ? '좋아요 취소' : '좋아요'}
            aria-pressed={isLiked}
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={isLiked ? tokens.colors.orange.primary : 'none'}
              color={tokens.colors.orange.primary}
            />
          </EngagementIcon>
          <EngagementCount>{likeCount}</EngagementCount>
        </EngagementItem>
        <EngagementItem onClick={handlePostClick}>
          <EngagementIcon role="button" aria-label="댓글 달기">
            <MessageSquare size={18} strokeWidth={2} color={tokens.colors.orange.primary} />
          </EngagementIcon>
          <EngagementCount>0</EngagementCount>
        </EngagementItem>
        <BookmarkButton type="button" aria-label="저장">
          <Bookmark size={18} strokeWidth={2} color={tokens.colors.orange.primary} />
        </BookmarkButton>
      </PostActions>

      <Caption>
        <Username>@{post.author.name}</Username> {post.description}
      </Caption>

      <CategoryTag>
        <Tag size={14} />
        {post.category.categoryName}
      </CategoryTag>

      <FeedTypeTag $feedType={post.feedType}>{post.feedType}</FeedTypeTag>

      <TimeStamp>{formatTimeAgo(post.createdAt)}</TimeStamp>
    </PostContainer>
  );
};

export default memo(FeedPost);
