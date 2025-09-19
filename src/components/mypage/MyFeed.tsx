import {
  Container,
  FeedList,
  FeedContainer,
  TopContainer,
  ProfileImage,
  InfoContainer,
  Nickname,
  SubInfo,
  Line,
  Image,
} from '@/components/mypage/MyFeed.style';
import ReactionBar from '@/components/mypage/ReactionBar';
import homeBaking from '@/assets/homeBaking.jpg';
import example from '@/assets/example.jpg';

const MyFeed = () => {
  return (
    <Container>
      <FeedList>
        {[1, 2, 3, 4].map((item) => (
          <FeedContainer key={item}>
            <TopContainer>
              <ProfileImage src={homeBaking} />
              <InfoContainer>
                <Nickname>빵수니</Nickname>
                <SubInfo>INFP 감성 빵 제조기입니당~</SubInfo>
              </InfoContainer>
            </TopContainer>
            <Line />
            <Image src={example} />
            <ReactionBar />
          </FeedContainer>
        ))}
      </FeedList>
    </Container>
  );
};

export default MyFeed;
