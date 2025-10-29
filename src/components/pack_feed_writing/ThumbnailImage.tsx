import { useRef, useState, useEffect } from 'react';
import { Desc, TitleStyle } from '@/components/pack_feed_writing/Title.style';
import { ImageUploadBox, ScrollContainer } from '@/components/pack_feed_writing/UploadBox.style';

type ThumbnailImageProps = {
  onChange: (url: string) => void;
};

const ThumbnailImage = ({ onChange }: ThumbnailImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    if (urls[0]) onChange(urls[0]);

    e.currentTarget.value = '';
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <>
      <TitleStyle>대표 이미지 업로드</TitleStyle>
      <ImageUploadBox onClick={handleBoxClick}>
        {previews.length > 0 ? (
          <ScrollContainer>
            {previews.map((src, idx) => (
              <div key={idx} style={{ flex: '0 0 80%' }}>
                <img
                  src={src}
                  alt={idx === 0 ? '대표 이미지' : `첨부 이미지 ${idx}`}
                  style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </ScrollContainer>
        ) : (
          <Desc>
            여러 장의 이미지를 업로드해주세요. <br /> (첫 번째가 대표 이미지)
          </Desc>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </ImageUploadBox>
    </>
  );
};

export default ThumbnailImage;
