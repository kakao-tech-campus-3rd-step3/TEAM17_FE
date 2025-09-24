import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ContentLinkUploadBox } from '@/components/feedwriting/UploadBox.style';

const ContentWriting = () => {
  return (
    <ColumnWrapper>
      <TitleStyle>설명 글 작성하기(본문내용)</TitleStyle>
      <ContentLinkUploadBox>
        <Desc>게시물에 대한 이야기를 적어주세요.</Desc>
      </ContentLinkUploadBox>
    </ColumnWrapper>
  );
};

export default ContentWriting;
