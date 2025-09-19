import {
  Grid,
  Card,
  Overlay,
  BottomLeft,
  TopRight,
  Kicker,
  Title,
  Badge,
} from '@/components/home/banner/Banner.styles';

const Banner = () => {
  return (
    <Grid>
      {/* Left Card */}
      <Card $variant="left">
        <Overlay $alpha={0.3} />
        <BottomLeft>
          <Kicker>캠핑장</Kicker>
          <Title>나의 감성 듬뿍 담은, 텐트 꾸미기!</Title>
        </BottomLeft>
        <TopRight>
          <Badge>리뷰</Badge>
        </TopRight>
      </Card>

      {/* Right Card */}
      <Card $variant="right">
        <Overlay $alpha={0.2} />
        <BottomLeft>
          <Kicker>젊음의 바다</Kicker>
          <Title>취미 서핑하러 양양 가기!</Title>
        </BottomLeft>
        <TopRight>
          <Badge>정보공유</Badge>
        </TopRight>
      </Card>
    </Grid>
  );
};

export default Banner;
