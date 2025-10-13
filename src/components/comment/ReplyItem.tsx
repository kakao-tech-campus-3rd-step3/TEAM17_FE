import React from 'react';
import { Heart, Reply as ReplyIcon, Flag } from 'lucide-react';
import type { Reply } from '@/types/Feed';
import { formatKoreanDate } from '@/utils/date';
import {
  ReplyItem as StyledReplyItem,
  ReplyAuthor,
  ReplyAuthorImage,
  ReplyAuthorName,
  ReplyContent,
  ReplyMeta,
  ReplyDate,
  ReplyActions,
  ReplyAction,
  ReplyLikeCount,
  ReplyButton,
  ReportButton,
} from './CommentSection.styles';

interface ReplyItemProps {
  reply: Reply;
  commentId: number;
  onLike: (replyId: number, isLiked: boolean, likeCount: number) => void;
  onStartReply: (commentId: number) => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply, commentId, onLike, onStartReply }) => {
  const handleLike = () => {
    onLike(reply.replyId || reply.commentId, reply.isLiked, reply.likeCount);
  };

  const handleStartReply = () => {
    onStartReply(commentId);
  };

  return (
    <StyledReplyItem>
      <ReplyAuthor>
        <ReplyAuthorImage src={reply.author.profileImageUrl} alt={reply.author.name} />
        <ReplyAuthorName>{reply.author.name}</ReplyAuthorName>
      </ReplyAuthor>

      <ReplyContent>{reply.content}</ReplyContent>

      <ReplyMeta>
        <ReplyDate>{formatKoreanDate(reply.createdAt)}</ReplyDate>
        <ReplyActions>
          <ReplyAction onClick={handleLike}>
            <Heart size={12} fill={reply.isLiked ? 'currentColor' : 'none'} />
          </ReplyAction>
          <ReplyLikeCount>{reply.likeCount}</ReplyLikeCount>
          <ReplyButton onClick={handleStartReply}>
            <ReplyIcon size={10} style={{ marginRight: '4px' }} />
            답글 달기
          </ReplyButton>
          <ReportButton>
            <Flag size={10} style={{ marginRight: '4px' }} />
            신고
          </ReportButton>
        </ReplyActions>
      </ReplyMeta>
    </StyledReplyItem>
  );
};

export default ReplyItem;
