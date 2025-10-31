import React from 'react';
import Skeleton from '@/components/common/Skeleton';
import {
  FeedItem,
  PostHeader,
  UserInfo,
  PostActions,
  LikesCount,
  Caption,
  CategoryTag,
} from './StyleFeedPreview.styles';

const FeedSkeleton: React.FC = () => {
  return (
    <FeedItem>
      <PostHeader>
        <UserInfo>
          <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
          <Skeleton width="4rem" height="0.75rem" />
        </UserInfo>
      </PostHeader>

      <Skeleton height="8rem" borderRadius="0" />

      <PostActions>
        <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
        <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
        <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
      </PostActions>

      <LikesCount>
        <Skeleton width="5rem" height="0.75rem" />
      </LikesCount>

      <Caption>
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="80%" height="0.75rem" />
      </Caption>

      <CategoryTag>
        <Skeleton width="3rem" height="0.625rem" />
      </CategoryTag>
    </FeedItem>
  );
};

export default FeedSkeleton;
