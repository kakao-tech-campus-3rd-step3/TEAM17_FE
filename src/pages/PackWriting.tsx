import { useState } from 'react';
import {
  TotalContainer,
  LayoutLine,
  ContentLinkWrapper,
  TagWrapper,
  SubmitButton,
  WarningText,
  InputField,
} from '@/components/pack_feed_writing/Layout.styles';
import { TitleStyle } from '@/components/pack_feed_writing/Title.styles';
import ThumbnailImage from '@/components/pack_feed_writing/ThumbnailImage';
import ContentWriting from '@/components/pack_feed_writing/ContentWriting';
import LinkWriting from '@/components/pack_feed_writing/LinkWriting';
import HobbyTag from '@/components/pack_feed_writing/HobbyTag';
import HashTag from '@/components/pack_feed_writing/HashTag';
import Price from '@/components/pack_feed_writing/Price';
import { useUploadPack } from '@/hooks/useUploadPack';
import type { WriteProduct } from '@/types/Product';

const PackWriting = () => {
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState<number | null>(null);
  const [items, setItems] = useState<WriteProduct[]>([]);
  const [error, setError] = useState('');

  const { mutate: uploadPack } = useUploadPack();

  const handleSubmit = () => {
    if (!mainImageUrl) {
      setError('대표 이미지를 업로드해주세요.');
      return;
    }
    if (!name.trim()) {
      setError('스타터팩 이름을 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      setError('설명을 작성해주세요.');
      return;
    }
    if (!categoryId) {
      setError('카테고리를 선택해주세요.');
      return;
    }
    if (tags.length === 0) {
      setError('해시태그를 입력해주세요.');
      return;
    }
    if (!price) {
      setError('가격을 입력해주세요.');
      return;
    }
    if (items.length === 0) {
      setError('상품을 최소 1개 추가해주세요.');
      return;
    }

    setError('');

    uploadPack({
      categoryId,
      name,
      price,
      mainImageUrl,
      description,
      items,
      hashtagNames: tags,
    });
  };

  return (
    <TotalContainer>
      <LayoutLine>
        <TitleStyle>제목작성</TitleStyle>
        <InputField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <ThumbnailImage onChange={setMainImageUrl} dirName="packs" />

        <ContentLinkWrapper>
          <ContentWriting onChange={setDescription} />
          <LinkWriting onChange={setItems} />
        </ContentLinkWrapper>
        <TagWrapper>
          <HobbyTag onChange={setCategoryId} />
          <HashTag onChange={setTags} />
          <Price onChange={setPrice} />
        </TagWrapper>
        {error && <WarningText>{error}</WarningText>}
        <SubmitButton onClick={handleSubmit}>스타터팩 업로드하기</SubmitButton>
      </LayoutLine>
    </TotalContainer>
  );
};

export default PackWriting;
