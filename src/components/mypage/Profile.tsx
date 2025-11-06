import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUser';
import { useMyPage } from '@/hooks/useMyPageContext';
import { useParams } from 'react-router-dom';
import defaultProfile from '@/assets/defaultProfile.png';
import icongrid from '@/assets/icon-grid.svg';
import iconsmile from '@/assets/icon-smile.svg';
import shuttle from '@/assets/shuttle.png';
import camera from '@/assets/camera.png';
import {
  Container,
  ProfileImage,
  InfoContainer,
  Nickname,
  RowContainer,
  Icon,
  Content,
  Gap,
  Gap2,
  GapVertical,
  SubInfo,
  EditButton,
  ButtonWrapper,
} from '@/components/mypage/Profile.styles';
import ProfileEditModal from '@/components/mypage/ProfileEditModal';

const Profile = () => {
  const { user } = useAuth();
  const { isOwner } = useMyPage();
  const { userId: paramId } = useParams<{ userId?: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const targetId = paramId ? Number(paramId) : user?.userId;

  const { data: profile, isLoading, isError } = useUserProfile(targetId, {
    enabled: !!targetId,
  });

  if (!targetId) {
    return <div>로그인이 필요한 서비스입니다.</div>;
  }

  if (isLoading) return <div>로딩 중...</div>;

  if (isError || !profile) {
    return (
      <Container>
        <ProfileImage src={defaultProfile} alt="프로필 이미지" />
        <InfoContainer>
          <Nickname>정보 없음</Nickname>
          <RowContainer>
            <Icon src={icongrid} alt="게시물 아이콘" />
            <Content>게시물 : 0</Content>
            <Gap />
            <Icon src={iconsmile} alt="취미 아이콘" />
            <Content>취미 : 정보 없음</Content>
          </RowContainer>
          <SubInfo>프로필 정보를 불러오지 못했습니다.</SubInfo>
        </InfoContainer>

        {isOwner && (
          <ButtonWrapper>
            <EditButton onClick={() => setIsModalOpen(true)}>정보 수정</EditButton>
          </ButtonWrapper>
        )}
      </Container>
    );
  }

  const displayNickname = profile.nickname?.trim() || '정보 없음';
  const displayHobby = profile.hobby?.trim() || '정보 없음';
  const displayBio = profile.bio?.trim() ? profile.bio : '프로필 정보를 수정해주세요.';
  const displayImage = profile.profileImageUrl?.trim() ? profile.profileImageUrl : defaultProfile;
  const displayCount = profile.totalPostCount ?? 0;
  const displayPackCount = profile.packCount ?? 0;
  const displayFeedCount = profile.feedCount ?? 0;

  return (
    <>
      <Container>
        <ProfileImage src={displayImage} alt="프로필 이미지" />

        <InfoContainer>
          <Nickname>{displayNickname}</Nickname>
          <SubInfo>{displayBio}</SubInfo>

          <RowContainer>
            <Icon src={icongrid} alt="게시물 아이콘" />
            <Content>총 게시물 :</Content>
            <Content>{displayCount}</Content>
            <Gap2 />
            <Icon src={iconsmile} alt="취미 아이콘" />
            <Content>취미 :</Content>
            <Content>{displayHobby}</Content>
          </RowContainer>

          <GapVertical />

          <RowContainer>
            <Icon src={shuttle} alt="PACK 아이콘" />
            <Content>Pack :</Content>
            <Content>{displayPackCount}</Content>
            <Gap />
            <Icon src={camera} alt="FEED 아이콘" />
            <Content>Feed :</Content>
            <Content>{displayFeedCount}</Content>
          </RowContainer>
        </InfoContainer>

        {isOwner && (
          <ButtonWrapper>
            <EditButton onClick={() => setIsModalOpen(true)}>정보 수정</EditButton>
          </ButtonWrapper>
        )}
      </Container>

      {isOwner && isModalOpen && (
        <ProfileEditModal
          profile={profile}
          userId={targetId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Profile;
