import {
  Wrap,
  Header,
  TitleWrapper,
  Title,
  Badge,
  Button,
  Grid,
  GridItem,
  ImagePlaceholder,
} from './StarterPreview.styles';

const StarterPreview = () => {
  return (
    <Wrap>
      <Header>
        <TitleWrapper>
          <Title>BEST 스타터팩</Title>
          <Badge>🚀</Badge>
        </TitleWrapper>
        <Button>더보기</Button>
      </Header>
      <Grid>
        {[1, 2, 3].map((item) => (
          <GridItem key={item}>
            <ImagePlaceholder>이미지</ImagePlaceholder>
          </GridItem>
        ))}
      </Grid>
    </Wrap>
  );
};

export default StarterPreview;
