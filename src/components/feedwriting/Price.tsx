import { useState } from 'react';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { PriceContainer, PriceBox } from '@/components/feedwriting/UploadBox.style';
import { formatNumberInput, parseNumberInput } from '@/utils/price';

const Price = () => {
  const [price, setPrice] = useState<number>(0);
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
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            required
            style={{ border: 'none', outline: 'none' }}
          />
        ) : (
          <Desc>대략적인 가격을 작성해주세요</Desc>
        )}
      </PriceBox>
    </PriceContainer>
  );
};

export default Price;
