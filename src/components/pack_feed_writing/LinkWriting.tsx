import { useState, useEffect } from 'react';
import { ColumnWrapper } from '@/components/pack_feed_writing/Layout.style';
import { Desc, TitleStyle } from '@/components/pack_feed_writing/Title.style';
import {
  LinkUploadBox,
  ProductWrapper,
  Product,
  ProductImage,
} from '@/components/pack_feed_writing/LinkWriting.style';

import LinkModal from '@/components/pack_feed_writing/LinkModal';
import type { ProductForm } from '@/types/LinkWriteForm';

type LinkWritingProps = {
  onChange: (items: ProductForm['products']) => void;
};

const LinkWriting = ({ onChange }: LinkWritingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<ProductForm>({
    products: [{ name: '', url: '', description: '', imageFile: undefined, imageUrl: undefined }],
  });

  const [submittedProducts, setSubmittedProducts] = useState<{ name: string; imageUrl?: string }[]>(
    []
  );

  const handleSubmit = (data: ProductForm) => {
    const productsWithPreview = data.products.map((p) => {
      const newImageUrl = p.imageFile ? URL.createObjectURL(p.imageFile) : p.imageUrl;
      return {
        ...p,
        imageUrl: newImageUrl,
      };
    });

    setFormData({ products: productsWithPreview });
    setSubmittedProducts(productsWithPreview);
    onChange(productsWithPreview);
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
      <LinkUploadBox $hasProducts={submittedProducts.length > 0} onClick={() => setIsOpen(true)}>
        {submittedProducts.length === 0 ? (
          <Desc>
            정보 공유 목적시 링크를 꼭 작성해 주세요. <br /> 작성을 원하실 경우 클릭해 주세요.
          </Desc>
        ) : (
          <ProductWrapper>
            {submittedProducts.map((p, idx) => (
              <Product key={idx}>
                {p.imageUrl && <ProductImage src={p.imageUrl} alt={p.name} />}
                <span>{p.name}</span>
              </Product>
            ))}
          </ProductWrapper>
        )}
      </LinkUploadBox>

      <LinkModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={formData}
      />
    </ColumnWrapper>
  );
};

export default LinkWriting;
