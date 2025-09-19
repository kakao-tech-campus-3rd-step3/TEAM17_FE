import { Heart, MessageSquare, Share, MoreHorizontal, Bookmark, Tag } from 'lucide-react';
import { useState } from 'react';
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
  onLike?: (feedId: number, isLiked: boolean) => void;
}

const FeedPost = ({ post, onLike }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const newIsLiked = !isLiked;

    try {
      const response = await likePost(post.feedId, newIsLiked);
      setIsLiked(newIsLiked);
      setLikeCount(response.likeCount);
      onLike?.(post.feedId, newIsLiked);
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
  };

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
        <ActionButton onClick={handleLike} disabled={isLoading}>
          <Heart
            size={24}
            fill={isLiked ? '#ef4444' : 'none'}
            color={isLiked ? '#ef4444' : '#000'}
          />
        </ActionButton>
        <ActionButton>
          <MessageSquare size={24} />
        </ActionButton>
        <ActionButton>
          <Share size={24} />
        </ActionButton>
        <ActionButton style={{ marginLeft: 'auto' }}>
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
          {post.products.map((product) => (
            <ProductItem key={product.productId}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductName>{product.name}</ProductName>
            </ProductItem>
          ))}
        </ProductsSection>
      )}

      <TimeStamp>{formatTimeAgo(post.createdAt)}</TimeStamp>
    </PostContainer>
  );
};

export default FeedPost;
