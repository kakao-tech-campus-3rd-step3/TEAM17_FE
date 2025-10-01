import React, { useState } from 'react';
import { Send } from 'lucide-react';
import {
  CommentInputSection,
  CommentInput as StyledCommentInput,
  CommentSubmitButton,
} from './CommentSection.styles';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit, placeholder = '댓글 작성하기' }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <CommentInputSection onSubmit={handleSubmit}>
      <StyledCommentInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
      />
      <CommentSubmitButton type="submit">
        <Send size={16} />
      </CommentSubmitButton>
    </CommentInputSection>
  );
};

export default CommentInput;
