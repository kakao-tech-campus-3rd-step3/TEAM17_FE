import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { fetchFeedLikers } from '@/api/feedApi';
import { QUERY_KEYS } from '@/utils/queryKeys';
import type { FeedLikerResponse } from '@/types/Feed';
import {
  Backdrop,
  ModalShell,
  ModalHeader,
  ModalTitle,
  CloseButton,
  UserList,
  UserItem,
  UserAvatar,
  UserInfo,
  UserName,
  EmptyState,
  LoadMoreButton,
  LoadingContainer,
} from '@/components/feed/FeedLikersModal.styles';

interface FeedLikersModalProps {
  feedId: number;
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PAGE_SIZE = 20;

const FeedLikersModal: React.FC<FeedLikersModalProps> = ({ feedId, isOpen, onClose }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: QUERY_KEYS.feeds.likers(feedId),
    queryFn: ({ pageParam = 0 }) => fetchFeedLikers(feedId, pageParam, DEFAULT_PAGE_SIZE),
    enabled: isOpen,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  const allLikers = data?.pages.flatMap((page) => page.content) ?? [];
  const totalCount = data?.pages[0]?.totalElements ?? 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <ModalShell>
        <ModalHeader>
          <ModalTitle>좋아요 {totalCount > 0 ? totalCount.toLocaleString() : ''}개</ModalTitle>
          <CloseButton onClick={onClose} aria-label="닫기">
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <UserList>
          {isLoading ? (
            <LoadingContainer>좋아요 사용자를 불러오는 중...</LoadingContainer>
          ) : allLikers.length === 0 ? (
            <EmptyState>아직 좋아요를 누른 사용자가 없습니다.</EmptyState>
          ) : (
            allLikers.map((liker: FeedLikerResponse) => (
              <UserItem key={liker.userId}>
                <UserAvatar src={liker.profileImageUrl || '/default-avatar.png'} alt={liker.name} />
                <UserInfo>
                  <UserName>{liker.name}</UserName>
                </UserInfo>
              </UserItem>
            ))
          )}
        </UserList>

        {hasNextPage && (
          <LoadMoreButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? '로딩 중...' : '더보기'}
          </LoadMoreButton>
        )}
      </ModalShell>
    </Backdrop>
  );
};

export default FeedLikersModal;
