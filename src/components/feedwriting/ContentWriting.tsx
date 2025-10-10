import { useState } from 'react';
import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ContentBox, TextArea, Counter } from '@/components/feedwriting/UploadBox.style';

const ContentWriting = () => {
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(false);
  const maxLength = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleBlur = () => {
    if (content.trim() === '') {
      setIsActive(false);
    }
  };

  return (
    <ColumnWrapper>
      <TitleStyle>설명 글 작성하기(본문내용)</TitleStyle>
      <ContentBox onClick={() => setIsActive(true)}>
        {isActive ? (
          <TextArea
            value={content}
            onChange={handleChange}
            maxLength={maxLength}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <Desc>게시물에 대한 이야기를 적어주세요.</Desc>
        )}
      </ContentBox>
      {isActive && (
        <Counter>
          {content.length} / {maxLength} 글자
        </Counter>
      )}
    </ColumnWrapper>
  );
};

export default ContentWriting;
