import { useRef, useState, useEffect } from 'react';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ImageUploadBox } from '@/components/feedwriting/UploadBox.style';

const ThumbnailImage = () => {
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
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`업로드 이미지 ${idx + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover' }}
              />
            ))}
          </div>
        ) : (
          <Desc>
            이미지를 업로드해주세요. <br /> (이미지 여러개 가능)
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
