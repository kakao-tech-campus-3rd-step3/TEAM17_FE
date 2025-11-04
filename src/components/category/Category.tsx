import React from 'react';
import { Wrap, Item, IconBox, Icon, Label } from './Category.styles';

import ShoppingCartIcon from '@/assets/icon-shopping-cart.svg';
import CameraIcon from '@/assets/icon-camera.svg';
import UsersIcon from '@/assets/icon-users.svg';
import SmileIcon from '@/assets/icon-smile.svg';

const NAV = [
  { to: '/starterpack', label: '취미팩 보러가기', icon: ShoppingCartIcon },
  { to: '/feed', label: '피드', icon: CameraIcon },
  { to: '/party', label: '파티원 모집', icon: UsersIcon },
  { to: '/mypage', label: '마이페이지', icon: SmileIcon },
] as const;

const Category: React.FC = () => {
  return (
    <Wrap aria-label="빠른 이동">
      {NAV.map(({ to, label, icon }) => (
        <Item key={to} to={to} aria-label={label} end>
          <IconBox>
            <Icon src={icon} alt={label} />
          </IconBox>
          <Label>{label}</Label>
        </Item>
      ))}
    </Wrap>
  );
};

export default Category;
