import { useState } from 'react';
import { Desc, TitleStyle } from '@/components/pack_feed_writing/Title.style';
import { PriceContainer, PriceBox, Priceinput } from '@/components/pack_feed_writing/Price.style';
import { formatNumberInput, parseNumberInput } from '@/utils/price';

const Price = () => {
  const [price, setPrice] = useState<number>(0);
  console.log(price); // api 연동 시 주석 지우기 (eslint 무시용)
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;

    const formatted = formatNumberInput(rawInput);
    setDisplayValue(formatted);

    const numeric = parseNumberInput(formatted);
    setPrice(numeric);
  };

  return (
    <PriceContainer>
      <TitleStyle>가격대 (전체적)</TitleStyle>
      <PriceBox onClick={() => setIsActive(true)}>
        {isActive ? (
          <Priceinput
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            required
          />
        ) : (
          <Desc>대략적인 가격을 작성해주세요</Desc>
        )}
      </PriceBox>
    </PriceContainer>
  );
};

export default Price;
