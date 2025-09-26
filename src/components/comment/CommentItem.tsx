import React from 'react';
import { Heart, Reply as ReplyIcon, Flag } from 'lucide-react';
import type { Comment } from '@/types/Feed';
import { formatKoreanDate } from '@/utils/date';
import ReplyList from './ReplyList';
import ReplyInput from './ReplyInput';
import {
  CommentItem as StyledCommentItem,
  CommentAuthor,
  CommentAuthorImage,
  CommentAuthorName,
  CommentContent,
  CommentMeta,
  CommentDate,
  CommentActions,
  CommentAction,
  CommentLikeCount,
  ReplyButton,
  ReportButton,
} from './CommentSection.styles';

interface CommentItemProps {
  comment: Comment;
  replyingTo: number | null;
  showReplies: { [key: number]: boolean };
  onLike: (commentId: number, isLiked: boolean, likeCount: number) => void;
  onStartReply: (commentId: number) => void;
  onToggleReplies: (commentId: number) => void;
  onLikeReply: (replyId: number, isLiked: boolean, likeCount: number) => void;
  onAddReply: (commentId: number, content: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  replyingTo,
  showReplies,
  onLike,
  onStartReply,
  onToggleReplies,
  onLikeReply,
  onAddReply,
}) => {
  const handleLike = () => {
    onLike(comment.commentId, comment.isLiked, comment.likeCount);
  };

  const handleStartReply = () => {
    onStartReply(comment.commentId);
  };

  const handleToggleReplies = () => {
    onToggleReplies(comment.commentId);
  };

  const handleAddReply = (content: string) => {
    onAddReply(comment.commentId, content);
  };

  return (
    <StyledCommentItem>
      <CommentAuthor>
        <CommentAuthorImage src={comment.author.profileImageUrl} alt={comment.author.name} />
        <CommentAuthorName>{comment.author.name}</CommentAuthorName>
      </CommentAuthor>

      <CommentContent>{comment.content}</CommentContent>

      <CommentMeta>
        <CommentDate>{formatKoreanDate(comment.createdAt)}</CommentDate>
        <CommentActions>
          <CommentAction onClick={handleLike}>
            <Heart size={14} fill={comment.isLiked ? 'currentColor' : 'none'} />
          </CommentAction>
          <CommentLikeCount>{comment.likeCount}</CommentLikeCount>
          <ReplyButton onClick={handleStartReply}>
            <ReplyIcon size={12} style={{ marginRight: '4px' }} />
            답글 달기
          </ReplyButton>
          <ReportButton>
            <Flag size={12} style={{ marginRight: '4px' }} />
            신고
          </ReportButton>
        </CommentActions>
      </CommentMeta>

      {/* 답글 목록 */}
      {comment.replies && comment.replies.length > 0 && (
        <ReplyList
          replies={comment.replies}
          commentId={comment.commentId}
          showReplies={showReplies[comment.commentId] || comment.replies.length === 1}
          onToggleReplies={handleToggleReplies}
          onLikeReply={onLikeReply}
          onStartReply={onStartReply}
        />
      )}

      {/* 답글 입력창 */}
      {replyingTo === comment.commentId && (
        <ReplyInput onSubmit={handleAddReply} placeholder="답글 작성하기" />
      )}
    </StyledCommentItem>
  );
};

export default CommentItem;
