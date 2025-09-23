import React from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import type { StarterPack } from '@/types/StarterPack';
import {
  Card,
  LikeButton,
  HeartIcon,
  DiscountBadge,
  ImageWrap,
  MainImage,
  HoverOverlay,
  Content,
  CategoryPill,
  Title,
  PriceCurrent,
  PriceOriginal,
  ButtonsRow,
  PrimaryBtn,
  GhostBtn,
  GridPreview,
  Thumb,
  PreviewCenter,
  EyeIcon,
  MoreText,
  HeaderRow,
  Rating,
  StarIcon,
  Description,
  PriceRow,
  PriceCol,
  CountText,
} from './StarterPackCard.styles';

type Props = {
  pack: StarterPack;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
  onOpen: (pack: StarterPack) => void;
};

const StarterPackCard: React.FC<Props> = ({ pack, isLiked, onToggleLike, onOpen }) => {
  return (
    <Card>
      <LikeButton
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike(pack.id);
        }}
        aria-label={isLiked ? '찜 취소' : '찜하기'}
      >
        <HeartIcon $liked />
      </LikeButton>

      {pack.discountRate > 0 && <DiscountBadge>{pack.discountRate}% 할인</DiscountBadge>}

      <ImageWrap onClick={() => onOpen(pack)}>
        <MainImage src={pack.mainImage} alt={pack.name} />
        <HoverOverlay>
          <PreviewCenter>
            <EyeIcon />
            <div>구성품 미리보기</div>
            <GridPreview>
              {pack.products.slice(0, 4).map((p) => (
                <Thumb key={p.id}>
                  <img src={p.src} alt={p.name} />
                  <p>{p.name}</p>
                </Thumb>
              ))}
            </GridPreview>
            {pack.products.length > 4 && <MoreText>+{pack.products.length - 4}개 더</MoreText>}
          </PreviewCenter>
        </HoverOverlay>
      </ImageWrap>

      <Content>
        <HeaderRow>
          <CategoryPill>{pack.category}</CategoryPill>
          <Rating>
            <StarIcon />
            <span style={{ fontWeight: 600 }}>{pack.likes}</span>
            <span>({pack.reviewCount})</span>
          </Rating>
        </HeaderRow>

        <Title>{pack.name}</Title>
        <Description>{pack.description}</Description>

        <PriceRow>
          <PriceCol>
            {pack.originalPrice !== pack.salePrice && (
              <PriceOriginal>{formatCurrency(pack.originalPrice)}</PriceOriginal>
            )}
            <PriceCurrent>{formatCurrency(pack.salePrice)}</PriceCurrent>
          </PriceCol>
          <CountText>{pack.products.length}개 구성</CountText>
        </PriceRow>

        <ButtonsRow>
          <PrimaryBtn onClick={() => onOpen(pack)}>
            <Eye width={16} height={16} />
            <span>상세보기</span>
          </PrimaryBtn>
          <GhostBtn>
            <ShoppingCart width={16} height={16} />
          </GhostBtn>
        </ButtonsRow>
      </Content>
    </Card>
  );
};

export default StarterPackCard;
