import React from 'react';
import type { StarterPack } from '../../types/StartPackType';
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
} from './StartpackModal.styles';

type Props = { pack: StarterPack; onClose: () => void };

const StartpackModal: React.FC<Props> = ({ pack, onClose }) => {
  const total = pack.products.reduce((sum, p) => sum + p.price, 0);
  const save = total - pack.salePrice;

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
                {pack.originalPrice !== pack.salePrice && (
                  <span className="original">{pack.originalPrice}</span>
                )}
                <span className="sale">{pack.salePrice}</span>
                {pack.discountRate > 0 && <span className="badge">{pack.discountRate}% 할인</span>}
              </div>
              <div className="desc">
                개별 구매 시: {total}
                <span className="save">({save} 절약!)</span>
              </div>
            </div>
            <div className="rating">
              <RatingStar />
              <RatingValue>{pack.rating}</RatingValue>
              <span className="review">{pack.reviewCount}개 리뷰</span>
            </div>
          </PriceBox>

          <Products>
            <h3>구성품 상세</h3>
            {pack.products.map((p) => (
              <div key={p.id} className="item">
                <img src={p.image} alt={p.name} />
                <div className="content">
                  <h4>{p.name}</h4>
                  <div className="price">{p.price}</div>
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

export default StartpackModal;
