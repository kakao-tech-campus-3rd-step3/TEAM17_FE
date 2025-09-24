import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { HashTagBox } from '@/components/feedwriting/HashTag.style';

const HashTag = () => {
  return (
    <ColumnWrapper>
      <TitleStyle>설명 글 작성하기(본문내용)</TitleStyle>
      <HashTagBox>
        <Desc>게시물에 대한 이야기를 적어주세요.</Desc>
      </HashTagBox>
    </ColumnWrapper>
  );
};

export default HashTag;
