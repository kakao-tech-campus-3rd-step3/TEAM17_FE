import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const CommentContainer = styled.div`
  background: ${tokens.colors.background.card};
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const CommentHeader = styled.div`
  margin-bottom: 1.25rem;
`;

export const CommentTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const CommentInputSection = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${tokens.colors.orange.muted};
  border-radius: 0.5rem;
  border: 0.0625rem solid ${tokens.colors.orange.light};
`;

export const CommentInput = styled.input`
  flex: 1;
  border: 0.0625rem solid ${tokens.colors.line.lightGray};
  border-radius: 1.25rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${tokens.colors.orange.primary};
    box-shadow: 0 0 0 0.125rem ${tokens.colors.orange.muted};
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
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    background: ${tokens.colors.orange.hover};
    transform: scale(1.05);
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const CommentItem = styled.div`
  border-bottom: 0.0625rem solid ${tokens.colors.line.lightGray};
  padding-bottom: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const CommentAuthorImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
  border: 0.0625rem solid ${tokens.colors.orange.light};
`;

export const CommentAuthorName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${tokens.colors.text.black};
  text-align: left;
`;

export const CommentContent = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${tokens.colors.text.black};
  margin-bottom: 0.5rem;
  white-space: pre-line;
  text-align: left;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const CommentDate = styled.span`
  font-size: 0.75rem;
  color: ${tokens.colors.text.lightGray};
  text-align: left;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  font-size: 0.75rem;
  color: ${tokens.colors.text.gray};
  margin-left: 0.25rem;
`;

export const ReplySection = styled.div`
  margin-left: 2.5rem;
  margin-top: 0.75rem;
`;

export const ReplyItem = styled.div`
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
`;

export const ReplyAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.375rem;
`;

export const ReplyAuthorImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.375rem;
  object-fit: cover;
`;

export const ReplyAuthorName = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #333;
  text-align: left;
`;

export const ReplyContent = styled.div`
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #333;
  margin-bottom: 0.375rem;
  white-space: pre-line;
  text-align: left;
`;

export const ReplyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ReplyDate = styled.span`
  font-size: 0.6875rem;
  color: #999;
  text-align: left;
`;

export const ReplyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
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
  font-size: 0.6875rem;
  color: #666;
  margin-left: 0.125rem;
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.feed.comment};
  font-size: 0.75rem;
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
  font-size: 0.75rem;
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
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: ${tokens.colors.orange.muted};
  border-radius: 0.5rem;
  border: 0.0625rem solid ${tokens.colors.orange.light};
`;

export const ReplyInput = styled.input`
  flex: 1;
  border: 0.0625rem solid ${tokens.colors.line.lightGray};
  border-radius: 1rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${tokens.colors.orange.primary};
    box-shadow: 0 0 0 0.125rem ${tokens.colors.orange.muted};
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
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;
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
  font-size: 0.75rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    color: ${tokens.colors.orange.hover};
  }
`;
