import styled from 'styled-components';
import kakaoLogo from '@/assets/kakao.svg';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <Button onClick={handleKakaoLogin}>
      <img src={kakaoLogo} alt="Kakao" />
      카카오로 로그인
    </Button>
  );
};

export default KakaoLoginButton;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;
  gap: 0.5rem;
  width: 40%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 500;

  background-color: #fee500;
  color: #000;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;
