import { Heart, MessageSquare, Share } from 'lucide-react';
import {
  Wrap,
  Header,
  TitleWrapper,
  Title,
  Emoji,
  Button,
  Grid,
  FeedItem,
  ImageBox,
  PlaceholderText,
  CounterWrapper,
  Counter,
  Icon,
  UserInfo,
  Avatar,
  Username,
} from './FeedPreview.styles';

const FeedPreview = () => {
  return (
    <Wrap>
      <Header>
        <TitleWrapper>
          <Title>개성 넘치는 피드러들을 보러 오세요~!</Title>
          <Emoji>😊</Emoji>
        </TitleWrapper>
        <Button>더보기</Button>
      </Header>

      <Grid>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <FeedItem key={item}>
            <ImageBox>
              <PlaceholderText>이미지</PlaceholderText>
            </ImageBox>

            <CounterWrapper>
              <Counter>
                <Icon>
                  <Heart size={12} color="#f97316" />
                </Icon>
                <span>{100 + item * 50}</span>
              </Counter>
              <Counter>
                <Icon>
                  <MessageSquare size={12} color="#3b82f6" />
                </Icon>
                <span>{10 + item}</span>
              </Counter>
              <Counter>
                <Icon>
                  <Share size={12} color="#2563eb" />
                </Icon>
                <span>{200 + item * 10}</span>
              </Counter>
            </CounterWrapper>

            <UserInfo>
              <Avatar />
              <Username>캐릭명{item}</Username>
            </UserInfo>
          </FeedItem>
        ))}
      </Grid>
    </Wrap>
  );
};

export default FeedPreview;
