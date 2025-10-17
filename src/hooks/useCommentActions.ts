import { useState, useCallback } from 'react';
import type { CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';

interface UseCommentActionsProps {
  feedId: number;
  onAddComment: (comment: CreateCommentRequest) => void;
  onAddReply: (reply: CreateReplyRequest) => void;
  onLikeComment: (commentId: number, isLiked: boolean, likeCount: number) => void;
  onLikeReply: (replyId: number, isLiked: boolean, likeCount: number) => void;
}

export const useCommentActions = ({
  feedId,
  onAddReply,
  onLikeComment,
  onLikeReply,
}: UseCommentActionsProps) => {
  // 답글 작성 상태
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // 답글 표시 상태
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});

  // 답글 제출 핸들러
  const handleSubmitReply = useCallback(
    (commentId: number) => {
      if (replyContent.trim()) {
        onAddReply({ feedId, commentId, content: replyContent.trim() });
        setReplyContent('');
        setReplyingTo(null);
      }
    },
    [feedId, replyContent, onAddReply]
  );

  // 댓글 좋아요 핸들러
  const handleLikeComment = useCallback(
    (commentId: number, isLiked: boolean, likeCount: number) => {
      onLikeComment(commentId, !isLiked, isLiked ? likeCount - 1 : likeCount + 1);
    },
    [onLikeComment]
  );

  // 답글 좋아요 핸들러
  const handleLikeReply = useCallback(
    (replyId: number, isLiked: boolean, likeCount: number) => {
      onLikeReply(replyId, !isLiked, isLiked ? likeCount - 1 : likeCount + 1);
    },
    [onLikeReply]
  );

  // 답글 표시 토글 핸들러
  const toggleReplies = useCallback((commentId: number) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }, []);

  // 답글 작성 시작 핸들러
  const startReplying = useCallback((commentId: number) => {
    setReplyingTo(commentId);
  }, []);

  // 답글 작성 취소 핸들러
  const cancelReplying = useCallback(() => {
    setReplyingTo(null);
    setReplyContent('');
  }, []);

  return {
    // 상태
    replyingTo,
    replyContent,
    showReplies,

    // 상태 변경 함수
    setReplyContent,

    // 이벤트 핸들러
    handleSubmitReply,
    handleLikeComment,
    handleLikeReply,
    toggleReplies,
    startReplying,
    cancelReplying,
  };
};
