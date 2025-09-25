import { useRef } from 'react';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ImageUploadBox } from '@/components/feedwriting/UploadBox.style';

const ThumbnailImage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <TitleStyle>대표 이미지 업로드</TitleStyle>
      <ImageUploadBox onClick={handleBoxClick}>
        <Desc>
          대표 이미지를 업로드해주세요. <br /> 클릭 시 이미지 불러오기
        </Desc>
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} />
      </ImageUploadBox>
    </>
  );
};

export default ThumbnailImage;
