import React from 'react';
import { Send } from 'lucide-react';
import {
  CommentInputSection,
  CommentInput as StyledCommentInput,
  CommentSubmitButton,
} from './CommentSection.styles';

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = '댓글 작성하기',
}) => {
  return (
    <CommentInputSection onSubmit={onSubmit}>
      <StyledCommentInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <CommentSubmitButton type="submit">
        <Send size={16} />
      </CommentSubmitButton>
    </CommentInputSection>
  );
};

export default CommentInput;
