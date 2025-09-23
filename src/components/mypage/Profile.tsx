import {
  Container,
  ProfileImage,
  InfoContainer,
  Nickname,
  RowContainer,
  Icon,
  Content,
  Gap,
  SubInfo,
  EditButton,
  ButtonWrapper,
} from '@/components/mypage/Profile.style';
import homeBaking from '@/assets/homeBaking.jpg';
import icongrid from '@/assets/icon-grid.svg';
import iconsmile from '@/assets/icon-smile.svg';

const Profile = () => {
  return (
    <>
      <Container>
        <ProfileImage src={homeBaking} />
        <InfoContainer>
          <Nickname>빵수니</Nickname>
          <RowContainer>
            <Icon src={icongrid} />
            <Content>게시물 :</Content>
            <Content>10</Content>
            <Gap />
            <Icon src={iconsmile} />
            <Content>취미 :</Content>
            <Content>베이킹</Content>
          </RowContainer>
          <SubInfo>안녕하세요! 빵수니입니다. 베이킹을 좋아해요!</SubInfo>
        </InfoContainer>
        <ButtonWrapper>
          <EditButton>정보 수정</EditButton>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default Profile;
