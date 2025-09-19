import { Heart, MessageSquare, Share, MoreHorizontal, Bookmark, Tag } from 'lucide-react';
import { useState, useCallback, memo } from 'react';
import type { FeedPost as FeedPostType } from '@/types/Feed';
import { likePost } from '@/mocks/feedData';
import {
  PostContainer,
  PostHeader,
  UserInfo,
  Avatar,
  Username,
  MoreButton,
  PostImage,
  PostActions,
  ActionButton,
  LikesCount,
  Caption,
  TimeStamp,
  CategoryTag,
  FeedTypeTag,
  ProductsSection,
  ProductItem,
  ProductImage,
  ProductName,
} from './FeedPost.styles';

interface FeedPostProps {
  post: FeedPostType;
  onLike?: (feedId: number, isLiked: boolean, likeCount: number) => void;
}

const FeedPost = ({ post, onLike }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = useCallback(async () => {
    if (isLoading) return;

    // 낙관적 업데이트: 즉시 UI 업데이트
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    // 이전 상태 저장 (롤백용)
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);
    setIsLoading(true);

    onLike?.(post.feedId, newIsLiked, newLikeCount);

    try {
      const response = await likePost(post.feedId, newIsLiked);

      setIsLiked(response.isLiked);
      setLikeCount(response.likeCount);
      onLike?.(post.feedId, response.isLiked, response.likeCount);
    } catch (error) {
      // 실패 시 롤백
      console.error('Failed to like post:', error);
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);

      onLike?.(post.feedId, previousIsLiked, previousLikeCount);
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, likeCount, isLoading, post.feedId, onLike]);

  const formatTimeAgo = useCallback((dateString: string): string => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    }
    if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    }
    if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    }
    if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    }
    if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    }
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }, []);

  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <Avatar src={post.author.profileImageUrl} alt={post.author.name} />
          <Username>@{post.author.name}</Username>
        </UserInfo>
        <MoreButton>
          <MoreHorizontal size={20} />
        </MoreButton>
      </PostHeader>

      <PostImage src={post.imageUrl} alt={`Post by ${post.author.name}`} />

      <PostActions>
        <ActionButton
          onClick={handleLike}
          disabled={isLoading}
          type="button"
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          aria-pressed={isLiked}
        >
          <Heart
            size={24}
            fill={isLiked ? '#ef4444' : 'none'}
            color={isLiked ? '#ef4444' : '#000'}
          />
        </ActionButton>
        <ActionButton type="button" aria-label="댓글 달기">
          <MessageSquare size={24} />
        </ActionButton>
        <ActionButton type="button" aria-label="공유하기">
          <Share size={24} />
        </ActionButton>
        <ActionButton type="button" aria-label="저장" style={{ marginLeft: 'auto' }}>
          <Bookmark size={24} />
        </ActionButton>
      </PostActions>

      <LikesCount>{likeCount.toLocaleString()}개 좋아요</LikesCount>

      <Caption>
        <Username>@{post.author.name}</Username> {post.description}
      </Caption>

      <CategoryTag>
        <Tag size={14} />
        {post.category.categoryName}
      </CategoryTag>

      <FeedTypeTag feedType={post.feedType}>{post.feedType}</FeedTypeTag>

      {post.products.length > 0 && (
        <ProductsSection>
          <h4>관련 제품</h4>
          <ul role="list" aria-label="관련 제품 목록">
            {post.products.map((product) => (
              <li key={product.productId}>
                <ProductItem>
                  <ProductImage src={product.imageUrl} alt={product.name} />
                  <ProductName>{product.name}</ProductName>
                </ProductItem>
              </li>
            ))}
          </ul>
        </ProductsSection>
      )}

      <TimeStamp>{formatTimeAgo(post.createdAt)}</TimeStamp>
    </PostContainer>
  );
};

export default memo(FeedPost);
