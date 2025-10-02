import React from 'react';
import type { Comment, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import { useCommentActions } from '@/hooks/useCommentActions';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import {
  CommentContainer,
  CommentHeader,
  CommentTitle,
  CommentList,
} from './CommentSection.styles';

interface CommentSectionProps {
  comments: Comment[];
  feedId: number;
  onAddComment: (comment: CreateCommentRequest) => void;
  onAddReply: (reply: CreateReplyRequest) => void;
  onLikeComment: (commentId: number, isLiked: boolean, likeCount: number) => void;
  onLikeReply: (replyId: number, isLiked: boolean, likeCount: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  feedId,
  onAddComment,
  onAddReply,
  onLikeComment,
  onLikeReply,
}) => {
  const {
    replyingTo,
    showReplies,
    handleLikeComment,
    handleLikeReply,
    toggleReplies,
    startReplying,
  } = useCommentActions({
    feedId,
    onAddComment,
    onAddReply,
    onLikeComment,
    onLikeReply,
  });

  const handleAddComment = (content: string) => {
    onAddComment({ feedId, content });
  };

  const handleAddReply = (commentId: number, content: string) => {
    onAddReply({ commentId, content });
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <CommentTitle>Comment</CommentTitle>
      </CommentHeader>

      {/* 댓글 작성 */}
      <CommentInput
        onSubmit={handleAddComment}
        placeholder="댓글 작성하기"
      />

      {/* 댓글 목록 */}
      <CommentList>
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            replyingTo={replyingTo}
            showReplies={showReplies}
            onLike={handleLikeComment}
            onStartReply={startReplying}
            onToggleReplies={toggleReplies}
            onLikeReply={handleLikeReply}
            onAddReply={handleAddReply}
          />
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentSection;
