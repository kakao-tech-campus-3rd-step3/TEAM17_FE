import { useState } from 'react';
import { useUserProfile } from '@/hooks/useUser';
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
import ProfileEditModal from '@/components/mypage/ProfileEditModal';

const Profile = () => {
  const { data: profile, isLoading, isError } = useUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div>로딩 중...</div>;

  const safeProfile = isError
    ? {
        nickname: '정보 없음',
        hobby: '정보 없음',
        introduction: '프로필 정보를 불러오지 못했습니다.',
        profileImage: null,
        postCount: 0,
      }
    : (profile ?? {});

  const {
    nickname = '정보 없음',
    hobby = '정보 없음',
    introduction = '정보 없음',
    profileImage,
    postCount = 0,
  } = safeProfile;

  return (
    <>
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
          <EditButton onClick={() => setIsModalOpen(true)}>정보 수정</EditButton>
        </ButtonWrapper>
      </Container>

      {isModalOpen && (
        <ProfileEditModal
          profile={safeProfile}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Profile;
