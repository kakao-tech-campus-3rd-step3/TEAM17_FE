import React from 'react';
import type { Reply } from '@/types/Feed';
import ReplyItem from './ReplyItem';
import { ReplySection, ShowRepliesButton } from './CommentSection.styles';

interface ReplyListProps {
  replies: Reply[];
  commentId: number;
  showReplies: boolean;
  onToggleReplies: () => void;
  onLikeReply: (replyId: number, isLiked: boolean, likeCount: number) => void;
  onStartReply: (commentId: number) => void;
}

const ReplyList: React.FC<ReplyListProps> = ({
  replies,
  commentId,
  showReplies,
  onToggleReplies,
  onLikeReply,
  onStartReply,
}) => {
  const handleToggleReplies = () => {
    onToggleReplies();
  };

  const handleStartReply = () => {
    onStartReply(commentId);
  };

  return (
    <ReplySection>
      {replies.length > 1 && (
        <ShowRepliesButton onClick={handleToggleReplies}>
          {showReplies ? '답글 숨기기' : `답글 ${replies.length}개 보기`}
        </ShowRepliesButton>
      )}

      {showReplies && (
        <>
          {replies.map((reply) => (
            <ReplyItem
              key={reply.replyId}
              reply={reply}
              commentId={commentId}
              onLike={onLikeReply}
              onStartReply={handleStartReply}
            />
          ))}
        </>
      )}
    </ReplySection>
  );
};

export default ReplyList;
