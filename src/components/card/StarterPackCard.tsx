import React from 'react';
import { Heart, MessageSquare, Share, MoreHorizontal, Bookmark, Tag } from 'lucide-react';
import type { StarterPack } from '@/types/StarterPack';
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
};

const StarterPackCard: React.FC<Props> = ({ pack, isLiked, onToggleLike, onOpen }) => {
  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <Avatar src="/default-avatar.png" alt="스타터팩" />
          <Username>@{pack.authorNickname}</Username>
        </UserInfo>
        <MoreButton>
          <MoreHorizontal size={20} />
        </MoreButton>
      </PostHeader>

      <PostImage src={pack.mainImageUrl} alt={pack.name} onClick={() => onOpen(pack)} />

      <PostActions>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(pack.id);
          }}
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
        <ActionButton type="button" aria-label="저장" $alignRight>
          <Bookmark size={24} />
        </ActionButton>
      </PostActions>

      <LikesCount>{(pack.likeCount ?? 0).toLocaleString()}개 좋아요</LikesCount>

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
              return (
                <li key={itemKey}>
                  <ProductItem>
                    <ProductImage src={item.imageUrl} alt={item.name} />
                    <ProductName>{item.name}</ProductName>
                  </ProductItem>
                </li>
              );
            })}
          </ul>
        </ProductsSection>
      )}

      <TimeStamp>어제</TimeStamp>
    </PostContainer>
  );
};

export default StarterPackCard;
