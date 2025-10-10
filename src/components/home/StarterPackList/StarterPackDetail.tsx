import React from 'react';
import type { StarterPack } from '@/types/StarterPack';
import {
  Backdrop,
  Shell,
  ModalHeader,
  CloseBtn,
  CloseIcon,
  Body,
  PriceBox,
  Products,
  Actions,
  RatingStar,
  RatingValue,
  CartIcon,
} from './StarterpackDetail.styles';

type Props = { pack: StarterPack; onClose: () => void };

const StarterPackDetail: React.FC<Props> = ({ pack, onClose }) => {
  const total = pack.products?.reduce((sum, p) => sum + (p.cost || 0), 0) || 0;
  const save = total - (pack.salePrice || 0);

  return (
    <Backdrop role="dialog" aria-modal="true">
      <Shell>
        <ModalHeader>
          <div className="left">
            <img src={pack.mainImage} alt={pack.name} />
            <div>
              <h2>{pack.name}</h2>
              <p>{pack.description}</p>
            </div>
          </div>
          <CloseBtn onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </CloseBtn>
        </ModalHeader>

        <Body>
          <PriceBox>
            <div className="left">
              <div className="row">
                {pack.originalPrice && pack.salePrice && pack.originalPrice !== pack.salePrice && (
                  <span className="original">{pack.originalPrice}</span>
                )}
                <span className="sale">{pack.salePrice || 0}</span>
                {pack.discountRate && pack.discountRate > 0 && (
                  <span className="badge">{pack.discountRate}% 할인</span>
                )}
              </div>
              <div className="desc">
                개별 구매 시: {total}
                <span className="save">({save} 절약!)</span>
              </div>
            </div>
            <div className="rating">
              <RatingStar />
              <RatingValue>{pack.likeCount}</RatingValue>
              <span className="review">{pack.reviewCount || 0}개 리뷰</span>
            </div>
          </PriceBox>

          <Products>
            <h3>구성품 상세</h3>
            {pack.products?.map((p) => (
              <div key={p.productId} className="item">
                <img src={p.imageUrl} alt={p.name} />
                <div className="content">
                  <h4>{p.name}</h4>
                  <div className="price">{(p.cost || 0).toLocaleString()}원</div>
                </div>
              </div>
            ))}
          </Products>

          <Actions>
            <button className="primary">
              <CartIcon />
              장바구니 담기
            </button>
            <button className="secondary">바로 구매하기</button>
          </Actions>
        </Body>
      </Shell>
    </Backdrop>
  );
};

export default StarterPackDetail;
