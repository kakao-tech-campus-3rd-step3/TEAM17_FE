import { useState } from 'react';
import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import {
  HashTagBox,
  TagContainer,
  Tag,
  RemoveBtn,
  InputTag,
} from '@/components/feedwriting/HashTag.style';

const HashTag = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <ColumnWrapper>
      <TitleStyle>관련 해시태그</TitleStyle>
      <HashTagBox>
        {tags.length === 0 ? (
          <Desc>작성 후 Enter키 누르면, 해시태그 자동생성됩니다.</Desc>
        ) : (
          <>
            {tags.map((tag) => (
              <TagContainer key={tag}>
                <Tag>
                  #{tag}
                  <RemoveBtn onClick={() => handleRemoveTag(tag)}>×</RemoveBtn>
                </Tag>
              </TagContainer>
            ))}
          </>
        )}

        <InputTag
          type="text"
          value={inputValue}
          placeholder="Click! 여기를 클릭하여 해시태그를 입력하세요"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </HashTagBox>
    </ColumnWrapper>
  );
};

export default HashTag;
