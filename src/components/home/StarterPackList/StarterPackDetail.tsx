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
  return (
    <Backdrop role="dialog" aria-modal="true">
      <Shell>
        <ModalHeader>
          <div className="left">
            <img src={pack.mainImageUrl} alt={pack.name} />
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
                <span className="sale">{pack.price.toLocaleString()}원</span>
              </div>
            </div>
            <div className="rating">
              <RatingStar />
              <RatingValue>{pack.likeCount}</RatingValue>
              <span className="review">{pack.commentCount || 0}개 댓글</span>
            </div>
          </PriceBox>

          <Products>
            <h3>구성품 상세</h3>
            {pack.items?.map((item, index) => (
              <div key={index} className="item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="content">
                  <h4>{item.name}</h4>
                  {item.description && <div className="price">{item.description}</div>}
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
