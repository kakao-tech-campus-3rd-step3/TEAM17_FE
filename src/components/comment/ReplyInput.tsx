import React, { useState } from 'react';
import { Send } from 'lucide-react';
import {
  ReplyInputSection,
  ReplyInput as StyledReplyInput,
  ReplySubmitButton,
} from './CommentSection.styles';

interface ReplyInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ onSubmit, placeholder = '답글 작성하기' }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <ReplyInputSection onSubmit={handleSubmit}>
      <StyledReplyInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
      />
      <ReplySubmitButton type="submit">
        <Send size={14} />
      </ReplySubmitButton>
    </ReplyInputSection>
  );
};

export default ReplyInput;
