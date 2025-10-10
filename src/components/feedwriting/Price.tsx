import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { PriceContainer, PriceBox } from '@/components/feedwriting/UploadBox.style';
const Price = () => {
  return (
    <>
      <PriceContainer>
        <TitleStyle>가격대 (전체적)</TitleStyle>
        <PriceBox>
          <Desc>대략적인 가격을 작성해주세요</Desc>
        </PriceBox>
      </PriceContainer>
    </>
  );
};

export default Price;
