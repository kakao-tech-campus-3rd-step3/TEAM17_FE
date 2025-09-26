import { useState, useEffect } from 'react';
import { ColumnWrapper } from '@/components/feedwriting/Layout.style';
import { Desc, TitleStyle } from '@/components/feedwriting/Title.style';
import { ContentLinkUploadBox } from '@/components/feedwriting/UploadBox.style';

import LinkModal from '@/components/feedwriting/LinkModal';
import type { ProductForm } from '@/types/LinkWriteForm';

const LinkWriting = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [submittedProducts, setSubmittedProducts] = useState<{ name: string; imageUrl?: string }[]>(
    []
  );

  const handleSubmit = (data: ProductForm) => {
    const productsWithPreview = data.products.map((p) => {
      const file = p.image?.[0]; 
      return {
        name: p.name,
        imageUrl: file ? URL.createObjectURL(file) : undefined,
      };
    });

    setSubmittedProducts(productsWithPreview);
    setIsOpen(false);
  };
  useEffect(() => {
    return () => {
      submittedProducts.forEach((p) => {
        if (p.imageUrl) URL.revokeObjectURL(p.imageUrl);
      });
    };
  }, [submittedProducts]);
  return (
    <ColumnWrapper>
      <TitleStyle>상품 링크 작성하기</TitleStyle>
      <ContentLinkUploadBox onClick={() => setIsOpen(true)}>
        {submittedProducts.length === 0 ? (
          <Desc>
            정보 공유 목적시 링크를 꼭 작성해 주세요. <br /> 작성을 원하실 경우 클릭해 주세요.
          </Desc>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {submittedProducts.map((p, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                )}
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </ContentLinkUploadBox>

      <LinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
    </ColumnWrapper>
  );
};

export default LinkWriting;
