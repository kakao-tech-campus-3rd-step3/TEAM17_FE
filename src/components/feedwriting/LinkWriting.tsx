import { useState } from 'react';
import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ContentLinkUploadBox } from '@/components/feedwriting/UploadBox.style';

import LinkModal from '@/components/feedwriting/LinkModal';

const LinkWriting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: any) => {
    console.log('작성된 상품:', data);
    setIsOpen(false);
  };


  return (
    <ColumnWrapper>
      <TitleStyle>상품 링크 작성하기</TitleStyle>
      <ContentLinkUploadBox onClick={() => setIsOpen(true)}>
        <Desc>
          정보 공유 목적시 링크를 꼭 작성해 주세요. <br /> 작성을 원하실 경우 클릭해 주세요.
        </Desc>
      </ContentLinkUploadBox>

      <LinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
    </ColumnWrapper>
  );
};

export default LinkWriting;