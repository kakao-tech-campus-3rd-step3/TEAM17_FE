import { useState } from 'react';
import {
  TotalContainer,
  LayoutLine,
  TagWrapper,
  SubmitButton,
  WarningText,
} from '@/components/pack_feed_writing/Layout.style';
import ThumbnailImage from '@/components/pack_feed_writing/ThumbnailImage';
import FeedContentWriting from '@/components/pack_feed_writing/FeedContentWriting';
import HobbyTag from '@/components/pack_feed_writing/HobbyTag';
import HashTag from '@/components/pack_feed_writing/HashTag';
import { useUploadFeed } from '@/hooks/useUploadFeed';
const FeedWriting = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const { mutate: uploadFeed } = useUploadFeed();

  const handleSubmit = () => {
    if (!imageUrl) return setError('이미지를 업로드해주세요.');
    if (!description.trim()) return setError('내용을 작성해주세요.');
    if (!categoryId) return setError('카테고리를 선택해주세요.');
    if (tags.length === 0) return setError('해시태그를 입력해주세요.');

    setError('');

    uploadFeed({
      description,
      imageUrl,
      categoryId,
      hashtagNames: tags,
    });
  };

  return (
    <TotalContainer>
      <LayoutLine>
        <ThumbnailImage onChange={setImageUrl} />
        <FeedContentWriting onChange={setDescription} />
        <TagWrapper>
          <HobbyTag onChange={setCategoryId} />
          <HashTag onChange={setTags} />
        </TagWrapper>
        {error && <WarningText>{error}</WarningText>}
        <SubmitButton onClick={handleSubmit}>피드 업로드하기</SubmitButton>
      </LayoutLine>
    </TotalContainer>
  );
};

export default FeedWriting;
