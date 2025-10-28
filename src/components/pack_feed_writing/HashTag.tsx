import { useState } from 'react';
import { ColumnWrapper } from '@/components/pack_feed_writing/Layout.style';
import { Desc, TitleStyle } from '@/components/pack_feed_writing/Title.style';
import {
  HashTagBox,
  TagContainer,
  Tag,
  RemoveBtn,
  InputTag,
  WarningText,
} from '@/components/pack_feed_writing/HashTag.style';

import { validateTag } from '@/utils/validateHashTag';

const HashTag = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();

      const errorMsg = validateTag(inputValue, tags);

      if (errorMsg) {
        setError(errorMsg);
        return;
      }

      setTags([...tags, inputValue.trim()]);
      setInputValue('');
      setError('');
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
          <Desc>
            작성 후 Enter키 누르면, <br /> 해시태그 자동생성됩니다.
          </Desc>
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
          placeholder="여기 클릭하여 해시태그를 입력하세요"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {error && <WarningText>{error}</WarningText>}
      </HashTagBox>
    </ColumnWrapper>
  );
};

export default HashTag;
