import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileImage = styled.img`
  width: 15%;
  height: 15%;
  border-radius: 70px;
  margin: 3rem 4rem auto 4rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 3rem;
`;

export const Nickname = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.black};
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.8rem;
  gap: 0.4rem;
`;

export const Icon = styled.img`
  width: 30px;
`;

export const Content = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.black};
  font-weight: 500;
`;

export const Gap = styled.div`
  width: 2rem;
`;

export const SubInfo = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.black};
  margin-top: 1rem;
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const EditButton = styled.button`
  width: 8rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.text.white};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
`;
