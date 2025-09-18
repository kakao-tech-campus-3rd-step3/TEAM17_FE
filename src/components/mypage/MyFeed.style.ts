import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1rem;
  margin-top: 3rem;
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid black;
`;

export const FeedContainer = styled.div`
  width: 24%;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
export const ProfileImage = styled.img`
  width: 15%;
  height: 15%;
  border-radius: 70px;
  margin: 1rem 1rem auto 1rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0.6rem;
`;

export const Nickname = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const SubInfo = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const Line = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.orange};
`;

export const Image = styled.img`
  margin: auto;
  width: 90%;
  height: auto;
  display: block;
`;
