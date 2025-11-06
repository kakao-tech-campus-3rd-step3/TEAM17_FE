import React from 'react';
import { Heart, MessageSquare, MoreHorizontal, Bookmark, Tag } from 'lucide-react';
import type { StarterPack } from '@/types/StarterPack';
import { tokens } from '@/styles/tokens';
import defaultProfile from '@/assets/defaultProfile.png';
import { formatFeedDate } from '@/utils/date';
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
  HashtagContainer,
  HashtagSpan,
  ProductsSection,
  ProductItem,
  ProductImage,
  ProductName,
} from '@/components/card/StarterPackCard.styles';

const MAX_DISPLAY_ITEMS = 2;

type Props = {
  pack: StarterPack;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
  onOpen: (pack: StarterPack) => void;
  onToggleBookmark?: (id: number) => void;
};

const StarterPackCard: React.FC<Props> = ({
  pack,
  isLiked,
  onToggleLike,
  onOpen,
  onToggleBookmark,
}) => {
  const isBookmarked = pack.isBookmarked ?? false;

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    // defaultProfile도 실패할 경우 무한 루프 방지
    if (target.src !== defaultProfile) {
      target.src = defaultProfile;
    }
  };

  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <Avatar
            src={pack.authorProfileImageUrl || defaultProfile}
            alt={pack.authorNickname}
            onError={handleAvatarError}
          />
          <Username>@{pack.authorNickname}</Username>
        </UserInfo>
        <MoreButton>
          <MoreHorizontal size={20} />
        </MoreButton>
      </PostHeader>

      <PostImage src={pack.mainImageUrl} alt={pack.name} onClick={() => onOpen(pack)} />

      <PostActions>
        <EngagementItem
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(pack.id);
          }}
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          aria-pressed={isLiked}
        >
          <EngagementIcon>
            <Heart
              size={18}
              strokeWidth={2}
              fill={isLiked ? tokens.colors.orange.primary : 'none'}
              color={tokens.colors.orange.primary}
            />
          </EngagementIcon>
          <EngagementCount>{(pack.likeCount ?? 0).toLocaleString()}</EngagementCount>
        </EngagementItem>
        <EngagementItem
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(pack);
          }}
          aria-label="댓글 달기"
        >
          <EngagementIcon>
            <MessageSquare size={18} strokeWidth={2} color={tokens.colors.orange.primary} />
          </EngagementIcon>
          <EngagementCount>{(pack.commentCount ?? 0).toLocaleString()}</EngagementCount>
        </EngagementItem>
        <BookmarkButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleBookmark) {
              onToggleBookmark(pack.id);
            }
          }}
          aria-label={isBookmarked ? '북마크 취소' : '북마크'}
          aria-pressed={isBookmarked}
        >
          <Bookmark
            size={18}
            strokeWidth={2}
            fill={isBookmarked ? tokens.colors.orange.primary : 'none'}
            color={tokens.colors.orange.primary}
          />
        </BookmarkButton>
      </PostActions>

      <Caption>
        <Username>@{pack.authorNickname}</Username> {pack.description}
      </Caption>

      <CategoryTag>
        <Tag size={14} />
        {pack.categoryName}
      </CategoryTag>

      {pack.hashtags && pack.hashtags.length > 0 && (
        <HashtagContainer>
          {pack.hashtags.map((hashtag) => (
            <HashtagSpan key={hashtag.id}>#{hashtag.hashtagName}</HashtagSpan>
          ))}
        </HashtagContainer>
      )}

      {pack.items && pack.items.length > 0 && (
        <ProductsSection>
          <h4>관련 제품</h4>
          <ul role="list" aria-label="관련 제품 목록">
            {pack.items.slice(0, MAX_DISPLAY_ITEMS).map((item) => {
              // name과 linkUrl 조합으로 고유한 key 생성
              const itemKey = `${item.name}-${item.linkUrl}`;
              const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = 'none';
              };
              return (
                <li key={itemKey}>
                  <ProductItem>
                    {item.imageUrl && (
                      <ProductImage
                        src={item.imageUrl}
                        alt={item.name}
                        onError={handleImageError}
                      />
                    )}
                    <ProductName>{item.name}</ProductName>
                  </ProductItem>
                </li>
              );
            })}
          </ul>
        </ProductsSection>
      )}

      {pack.createdAt && <TimeStamp>{formatFeedDate(pack.createdAt)}</TimeStamp>}
    </PostContainer>
  );
};

export default StarterPackCard;
