import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(153, 65, 65, 0.81);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

export const LogoImg = styled.img`
  height: 200%;
  object-fit: contain;
`;

export const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

export const NavText = styled.div`
  color: #eb8a4b;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.24px;
`;

export const Gap = styled.div`
  width: 1rem;
`;

export const LoginButton = styled.button`
  padding: 4px 14px;
  border-radius: 6px;
  border: 2px solid #eb6b18;
  background-color: transparent;
`;

export const LoginText = styled.div`
  color: #eb6b18;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.16px;
`;

export const RegisterButton = styled.button`
  padding: 4px 14px;
  border-radius: 6px;
  border: 2px solid #eb6b18;
  background-color: #eb6b18;
`;

export const RegisterText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.16px;
`;