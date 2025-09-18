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
  Bottom,
  Copy,
} from './Footer.styles';

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
              <li>스타터팩 보러가기</li> {/* Footer는 추후에 수정 예정 */}
              <li>피드 보러가기</li>
              <li>커뮤니티</li>
              <li>파티원 모집</li>
            </List>
          </Column>
          <Column>
            <ColumnTitle>고객지원</ColumnTitle>
            <List>
              <li>공지사항</li>
              <li>FAQ</li>
              <li>문의하기</li>
              <li>이용약관</li>
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
