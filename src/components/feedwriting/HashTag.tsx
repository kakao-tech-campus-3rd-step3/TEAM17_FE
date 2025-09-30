import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { HashTagBox } from '@/components/feedwriting/HashTag.style';

const HashTag = () => {
  return (
    <ColumnWrapper>
      <TitleStyle>관련 해시태그</TitleStyle>
      <HashTagBox>
        <Desc>
          해시태그를 작성하고 싶다면
          <br />
          클릭해주세요
        </Desc>
      </HashTagBox>
    </ColumnWrapper>
  );
};

export default HashTag;
