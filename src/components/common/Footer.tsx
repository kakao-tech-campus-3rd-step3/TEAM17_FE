import { Link } from 'react-router-dom';
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
              <ListItem>
                <li>커뮤니티</li>
              </ListItem>
              <ListItem>
                <li>파티원 모집</li>
              </ListItem>
            </List>
          </Column>
          <Column>
            <ColumnTitle>고객지원</ColumnTitle>
            <List>
              <ListItem>
                <li>공지사항</li>
              </ListItem>
              <ListItem>
                <li>FAQ</li>
              </ListItem>
              <ListItem>
                <li>문의하기</li>
              </ListItem>
              <ListItem>
                <li>이용약관</li>
              </ListItem>
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
