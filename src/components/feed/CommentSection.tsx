import React from 'react';
import { Heart, Send, Reply as ReplyIcon, Flag } from 'lucide-react';
import type { Comment, CreateCommentRequest, CreateReplyRequest } from '@/types/Feed';
import { formatKoreanDate } from '@/utils/date';
import { useCommentActions } from '@/hooks/useCommentActions';
import {
  CommentContainer,
  CommentHeader,
  CommentTitle,
  CommentInputSection,
  CommentInput,
  CommentSubmitButton,
  CommentList,
  CommentItem,
  CommentAuthor,
  CommentAuthorImage,
  CommentAuthorName,
  CommentContent,
  CommentMeta,
  CommentDate,
  CommentActions,
  CommentAction,
  CommentLikeCount,
  ReplySection,
  ReplyItem,
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
  ReplyInputSection,
  ReplyInput,
  ReplySubmitButton,
  ShowRepliesButton,
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
    newComment,
    replyingTo,
    replyContent,
    showReplies,
    setNewComment,
    setReplyContent,
    handleSubmitComment,
    handleSubmitReply,
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

  return (
    <CommentContainer>
      <CommentHeader>
        <CommentTitle>Comment</CommentTitle>
      </CommentHeader>

      {/* 댓글 작성 */}
      <CommentInputSection onSubmit={handleSubmitComment}>
        <CommentInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 작성하기"
        />
        <CommentSubmitButton type="submit">
          <Send size={16} />
        </CommentSubmitButton>
      </CommentInputSection>

      {/* 댓글 목록 */}
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.commentId}>
            <CommentAuthor>
              <CommentAuthorImage src={comment.author.profileImageUrl} alt={comment.author.name} />
              <CommentAuthorName>{comment.author.name}</CommentAuthorName>
            </CommentAuthor>

            <CommentContent>{comment.content}</CommentContent>

            <CommentMeta>
              <CommentDate>{formatKoreanDate(comment.createdAt)}</CommentDate>
              <CommentActions>
                <CommentAction
                  onClick={() =>
                    handleLikeComment(comment.commentId, comment.isLiked, comment.likeCount)
                  }
                >
                  <Heart size={14} fill={comment.isLiked ? 'currentColor' : 'none'} />
                </CommentAction>
                <CommentLikeCount>{comment.likeCount}</CommentLikeCount>
                <ReplyButton onClick={() => startReplying(comment.commentId)}>
                  <ReplyIcon size={12} style={{ marginRight: '4px' }} />
                  답글 달기
                </ReplyButton>
                <ReportButton>
                  <Flag size={12} style={{ marginRight: '4px' }} />
                  신고
                </ReportButton>
              </CommentActions>
            </CommentMeta>

            {/* 답글 섹션 */}
            {comment.replies && comment.replies.length > 0 && (
              <ReplySection>
                {comment.replies.length > 1 && (
                  <ShowRepliesButton onClick={() => toggleReplies(comment.commentId)}>
                    {showReplies[comment.commentId]
                      ? '답글 숨기기'
                      : `답글 ${comment.replies.length}개 보기`}
                  </ShowRepliesButton>
                )}

                {(showReplies[comment.commentId] || comment.replies.length === 1) && (
                  <>
                    {comment.replies.map((reply) => (
                      <ReplyItem key={reply.replyId}>
                        <ReplyAuthor>
                          <ReplyAuthorImage
                            src={reply.author.profileImageUrl}
                            alt={reply.author.name}
                          />
                          <ReplyAuthorName>{reply.author.name}</ReplyAuthorName>
                        </ReplyAuthor>

                        <ReplyContent>{reply.content}</ReplyContent>

                        <ReplyMeta>
                          <ReplyDate>{formatKoreanDate(reply.createdAt)}</ReplyDate>
                          <ReplyActions>
                            <ReplyAction
                              onClick={() =>
                                handleLikeReply(reply.replyId, reply.isLiked, reply.likeCount)
                              }
                            >
                              <Heart size={12} fill={reply.isLiked ? 'currentColor' : 'none'} />
                            </ReplyAction>
                            <ReplyLikeCount>{reply.likeCount}</ReplyLikeCount>
                            <ReplyButton onClick={() => startReplying(comment.commentId)}>
                              <ReplyIcon size={10} style={{ marginRight: '4px' }} />
                              답글 달기
                            </ReplyButton>
                            <ReportButton>
                              <Flag size={10} style={{ marginRight: '4px' }} />
                              신고
                            </ReportButton>
                          </ReplyActions>
                        </ReplyMeta>
                      </ReplyItem>
                    ))}
                  </>
                )}
              </ReplySection>
            )}

            {/* 답글 작성 */}
            {replyingTo === comment.commentId && (
              <ReplyInputSection>
                <ReplyInput
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="답글 작성하기"
                />
                <ReplySubmitButton onClick={() => handleSubmitReply(comment.commentId)}>
                  <Send size={14} />
                </ReplySubmitButton>
              </ReplyInputSection>
            )}
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentSection;
