import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { COMMENT_CONSTANTS } from '@/constants/feed';
import {
  ReplyInputSection,
  ReplyInput as StyledReplyInput,
  ReplySubmitButton,
} from './CommentSection.styles';

interface ReplyInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ onSubmit, placeholder = COMMENT_CONSTANTS.REPLY_PLACEHOLDER }) => {
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
