import React from 'react';
import { MapPin, ShoppingCart, Camera, QrCode, Users } from 'lucide-react';
import { Wrap, Item, IconBox, Label } from './Category.styles';

const NAV = [
  { to: '/nearby', label: '내 주변 장소', Icon: MapPin },
  { to: '/starterpack', label: '스타터팩 보러가기', Icon: ShoppingCart },
  { to: '/feed', label: '취미 꾸미기', Icon: Camera },
  { to: '/board', label: '게시판', Icon: QrCode },
  { to: '/party', label: '파티원 모집', Icon: Users },
] as const;

const Category: React.FC = () => {
  return (
    <Wrap aria-label="빠른 이동">
      {NAV.map(({ to, label, Icon }) => (
        <Item key={to} to={to} aria-label={label} end>
          <IconBox>
            <Icon size={20} color="#f97316" />
          </IconBox>
          <Label>{label}</Label>
        </Item>
      ))}
    </Wrap>
  );
};

export default Category;
