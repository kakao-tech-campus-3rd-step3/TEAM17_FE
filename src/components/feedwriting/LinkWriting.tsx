import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ContentLinkUploadBox } from '@/components/feedwriting/UploadBox.style';

const LinkWriting = () => {
  return (
    <ColumnWrapper>
      <TitleStyle>상품 링크 작성하기</TitleStyle>
      <ContentLinkUploadBox>
        <Desc>
          정보 공유 목적시 링크를 꼭 작성해 주세요. <br /> 작성을 원하실 경우 클릭해 주세요.
        </Desc>
      </ContentLinkUploadBox>
    </ColumnWrapper>
  );
};

export default LinkWriting;
