import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import errorImage from '@/assets/errorimage.png'; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Image src={errorImage} alt="404 Error" />
      <Title>404 Error!!!</Title>
      <HomeButton onClick={() => navigate('/')}>홈으로 돌아가기</HomeButton>
    </Wrap>
  );
};

export default ErrorPage;


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
  text-align: center;
  padding: 2rem;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    width: 220px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ef4444;
  margin-bottom: 0.5rem;
`;

const HomeButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;
