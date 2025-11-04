import { useState, useEffect } from 'react';
import { ColumnWrapper } from '@/components/pack_feed_writing/Layout.styles';
import { Desc, TitleStyle } from '@/components/pack_feed_writing/Title.styles';
import {
  LinkUploadBox,
  ProductWrapper,
  Product,
  ProductImage,
} from '@/components/pack_feed_writing/LinkWriting.styles';

import LinkModal from '@/components/pack_feed_writing/LinkModal';
import type { ProductForm } from '@/types/LinkWriteForm';
import type { WriteProduct } from '@/types/Product';
import { useUploadImages } from '@/hooks/useUploadImages';

type LinkWritingProps = {
  onChange: (items: WriteProduct[]) => void;
};

const LinkWriting = ({ onChange }: LinkWritingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState<ProductForm>({
    products: [
      { name: '', linkUrl: '', description: '', imageFile: undefined, imageUrl: undefined },
    ],
  });

  const [submittedProducts, setSubmittedProducts] = useState<WriteProduct[]>([]);

  const { mutateAsync: uploadImages } = useUploadImages('products');

  const handleSubmit = async (data: ProductForm) => {
    setFormData(data); 
    setIsUploading(true); 
    setIsOpen(false); 

    try {
      const productsWithRealUrls: WriteProduct[] = await Promise.all(
        data.products.map(async (p) => {
          let finalImageUrl: string;

          if (p.imageFile) {
            const uploadedUrls = await uploadImages([p.imageFile]);
            finalImageUrl = uploadedUrls[0];
          } else {
            finalImageUrl = p.imageUrl ?? '';
          }

          return {
            name: p.name,
            linkUrl: p.linkUrl,
            description: p.description ?? '',
            imageUrl: finalImageUrl, 
          };
        }),
      );

      setSubmittedProducts(productsWithRealUrls);
      onChange(productsWithRealUrls);
    } catch (err) {
      console.error('상품 이미지 업로드 실패:', err);
      alert('상품 이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false); 
    }
  };

  useEffect(() => {
    return () => {
      submittedProducts.forEach((p) => {
        if (p.imageUrl && p.imageUrl.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(p.imageUrl);
          } catch (error) {
            console.warn('Failed to revoke blob URL:', error);
          }
        }
      });
    };
  }, [submittedProducts]);

  return (
    <ColumnWrapper>
      <TitleStyle>상품 링크 작성하기</TitleStyle>
      <LinkUploadBox
        $hasProducts={submittedProducts.length > 0}
        onClick={() => !isUploading && setIsOpen(true)}
      >
        {isUploading ? (
          <Desc>상품 이미지를 업로드 중입니다...</Desc>
        ) : submittedProducts.length === 0 ? (
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