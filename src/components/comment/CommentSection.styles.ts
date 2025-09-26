import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const CommentContainer = styled.div`
  background: ${tokens.colors.background.card};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const CommentHeader = styled.div`
  margin-bottom: 20px;
`;

export const CommentTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const CommentInputSection = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: ${tokens.colors.orange.muted};
  border-radius: 8px;
  border: 1px solid ${tokens.colors.orange.light};
`;

export const CommentInput = styled.input`
  flex: 1;
  border: 1px solid ${tokens.colors.line.lightGray};
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${tokens.colors.orange.primary};
    box-shadow: 0 0 0 2px ${tokens.colors.orange.muted};
  }

  &::placeholder {
    color: ${tokens.colors.text.lightGray};
  }
`;

export const CommentSubmitButton = styled.button`
  background: ${tokens.colors.feed.comment};
  color: ${tokens.colors.text.white};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.hover};
    transform: scale(1.05);
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentItem = styled.div`
  border-bottom: 1px solid ${tokens.colors.line.lightGray};
  padding-bottom: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const CommentAuthorImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  border: 1px solid ${tokens.colors.orange.light};
`;

export const CommentAuthorName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const CommentContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${tokens.colors.text.black};
  margin-bottom: 8px;
  white-space: pre-line;
  text-align: left;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: ${tokens.colors.text.lightGray};
  text-align: left;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentAction = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.feed.like};
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.orange.hover};
    transform: scale(1.1);
  }
`;

export const CommentLikeCount = styled.span`
  font-size: 12px;
  color: ${tokens.colors.text.gray};
  margin-left: 4px;
`;

export const ReplySection = styled.div`
  margin-left: 40px;
  margin-top: 12px;
`;

export const ReplyItem = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const ReplyAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const ReplyAuthorImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 6px;
  object-fit: cover;
`;

export const ReplyAuthorName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #333;
  text-align: left;
`;

export const ReplyContent = styled.div`
  font-size: 13px;
  line-height: 1.4;
  color: #333;
  margin-bottom: 6px;
  white-space: pre-line;
  text-align: left;
`;

export const ReplyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyDate = styled.span`
  font-size: 11px;
  color: #999;
  text-align: left;
`;

export const ReplyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ReplyAction = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.feed.like};
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.orange.hover};
    transform: scale(1.1);
  }
`;

export const ReplyLikeCount = styled.span`
  font-size: 11px;
  color: #666;
  margin-left: 2px;
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.feed.comment};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.orange.hover};
  }
`;

export const ReportButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.lightGray};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    color: ${tokens.colors.text.gray};
  }
`;

export const ReplyInputSection = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding: 12px;
  background: ${tokens.colors.orange.muted};
  border-radius: 8px;
  border: 1px solid ${tokens.colors.orange.light};
`;

export const ReplyInput = styled.input`
  flex: 1;
  border: 1px solid ${tokens.colors.line.lightGray};
  border-radius: 16px;
  padding: 8px 12px;
  font-size: 13px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${tokens.colors.orange.primary};
    box-shadow: 0 0 0 2px ${tokens.colors.orange.muted};
  }

  &::placeholder {
    color: ${tokens.colors.text.lightGray};
  }
`;

export const ReplySubmitButton = styled.button`
  background: ${tokens.colors.feed.comment};
  color: ${tokens.colors.text.white};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.hover};
    transform: scale(1.05);
  }
`;

export const ShowRepliesButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.feed.comment};
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    color: ${tokens.colors.orange.hover};
  }
`;
