import Logo from '@/assets/Logo.png';
import CommunityIcon from '@/assets/CommunityIcon.svg';
import PlaceIcon from '@/assets/PlaceIcon.svg';
import CategoryIcon from '@/assets/CategoryIcon.svg';

import {
  HeaderWrapper,
  LogoImg,
  NavWrapper,
  NavButton,
  NavText,
  Gap,
  LoginButton,
  LoginText,
  RegisterButton,
  RegisterText,
} from './Header.style';

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoImg src={Logo} />

      <NavWrapper>
        <NavButton>
          <img src={CommunityIcon} />
          <NavText>게시판</NavText>
        </NavButton>

        <NavButton>
          <img src={PlaceIcon} />
          <NavText>장소</NavText>
        </NavButton>

        <NavButton>
          <img src={CategoryIcon} />
          <NavText>카테고리</NavText>
        </NavButton>

        <Gap />

        <LoginButton>
          <LoginText>로그인</LoginText>
        </LoginButton>
        <RegisterButton>
          <RegisterText>회원가입</RegisterText>
        </RegisterButton>
      </NavWrapper>
    </HeaderWrapper>
  );
};

export default Header;
