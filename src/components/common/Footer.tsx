import {
  FooterWrap,
  Container,
  Top,
  Brand,
  Slogan,
  LinksGrid,
  Column,
  ColumnTitle,
  List,
  ListItem,
  ListLink,
  Bottom,
  Copy,
} from '@/components/common/Footer.styles';

const Footer = () => {
  return (
    <FooterWrap>
      <Container>
        <Top>
          <Brand>장비빨🔥</Brand>
          <Slogan>취미, 제대로 시작하자!</Slogan>
        </Top>

        <LinksGrid>
          <Column>
            <ColumnTitle>서비스</ColumnTitle>
            <List>
              <ListItem>
                <ListLink to="/starterpack">스타터팩 보러가기</ListLink>
              </ListItem>
              <ListItem>
                <ListLink to="/feed">피드 보러가기</ListLink>
              </ListItem>
              <ListItem>커뮤니티</ListItem>
              <ListItem>파티원 모집</ListItem>
            </List>
          </Column>
          <Column>
            <ColumnTitle>고객지원</ColumnTitle>
            <List>
              <ListItem>공지사항</ListItem>
              <ListItem>FAQ</ListItem>
              <ListItem>문의하기</ListItem>
              <ListItem>이용약관</ListItem>
            </List>
          </Column>
        </LinksGrid>

        <Bottom>
          <Copy>© 2025 장비빨. All rights reserved.</Copy>
        </Bottom>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
