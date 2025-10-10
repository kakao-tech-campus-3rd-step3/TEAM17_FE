import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button, Icon } from './WriteButton.styles';

const WriteButton = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  const handleClick = () => {
    if (!isLogin) {
      alert('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    navigate('/feedwriting');
  };

  return (
    <Button onClick={handleClick} aria-label="글쓰기">
      <Icon>✏️</Icon>
    </Button>
  );
};

export default WriteButton;
