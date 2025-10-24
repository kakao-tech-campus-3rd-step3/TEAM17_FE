import defaultProfile from '@/assets/defaultProfile.png';
import icongrid from '@/assets/icon-grid.svg';
import iconsmile from '@/assets/icon-smile.svg';
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
import { useUserProfile } from '@/hooks/useUser';

const Profile = () => {
  const { data: profile, isLoading, isError } = useUserProfile();

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    return (
      <Container>
        <ProfileImage src={defaultProfile} alt="기본 프로필 이미지" />
        <InfoContainer>
          <Nickname>정보 없음</Nickname>
          <RowContainer>
            <Icon src={icongrid} />
            <Content>게시물 :</Content>
            <Content>0</Content>
            <Gap />
            <Icon src={iconsmile} />
            <Content>취미 :</Content>
            <Content>정보 없음</Content>
          </RowContainer>
          <SubInfo>프로필 정보를 불러오지 못했습니다.</SubInfo>
          
        </InfoContainer>
      </Container>
    );
  }

  const {
    nickname = '정보 없음',
    hobby = '정보 없음',
    introduction = '정보 없음',
    profileImage,
    postCount = 0,
  } = profile ?? {};

  return (
    <Container>
      <ProfileImage src={profileImage || defaultProfile} alt="프로필 이미지" />
      <InfoContainer>
        <Nickname>{nickname}</Nickname>
        <RowContainer>
          <Icon src={icongrid} alt="게시물 아이콘" />
          <Content>게시물 :</Content>
          <Content>{postCount}</Content>
          <Gap />
          <Icon src={iconsmile} alt="취미 아이콘" />
          <Content>취미 :</Content>
          <Content>{hobby}</Content>
        </RowContainer>
        <SubInfo>{introduction}</SubInfo>
      </InfoContainer>
      <ButtonWrapper>
        <EditButton>정보 수정</EditButton>
      </ButtonWrapper>
    </Container>
  );
};

export default Profile;
