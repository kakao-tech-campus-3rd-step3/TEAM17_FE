import React from 'react';
import { MapPin, ShoppingCart, Camera, QrCode, Users } from 'lucide-react';
import { Wrap, Item, IconBox, Label } from './Category.styles';

const Category = () => {
  return (
    <Wrap>
      <Item>
        <IconBox>
          <MapPin size={20} color="#f97316" />
        </IconBox>
        <Label>내 주변 장소</Label>
      </Item>

      <Item>
        <IconBox>
          <ShoppingCart size={20} color="#f97316" />
        </IconBox>
        <Label>스타터팩 보러가기</Label>
      </Item>

      <Item>
        <IconBox>
          <Camera size={20} color="#f97316" />
        </IconBox>
        <Label>취미 꾸미기</Label>
      </Item>

      <Item>
        <IconBox>
          <QrCode size={20} color="#f97316" />
        </IconBox>
        <Label>게시판</Label>
      </Item>

      <Item>
        <IconBox>
          <Users size={20} color="#f97316" />
        </IconBox>
        <Label>파티원 모집</Label>
      </Item>
    </Wrap>
  );
};

export default Category;
