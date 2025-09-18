import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { login as loginApi } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginValues } from '@/types/LoginZodSchema';

import {
  LoginContainer,
  Inputfield,
  Title,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
  Comment,
  CommentLink,
  SocialButton,
  Line,
  ToggleButton,
  InputWrapper,
} from '@/components/login/Login.style';

import EyeOn from '@/assets/icon-eye.svg';
import EyeOff from '@/assets/icon-eye-off.svg';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await loginApi(data);
      console.log('로그인 성공:', res);

      login(res.accessToken, res.refreshToken);

      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('이메일/비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
      <LoginContainer>
        <Title>로그인</Title>
        <Inputfield onSubmit={handleSubmit(onSubmit)}>
          <Label>이메일</Label>
          <Input type="email" {...register('email')} placeholder="youremail@example.com" />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Label>비밀번호</Label>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="비밀번호를 입력해주세요"
            />
            <ToggleButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
              <img
                src={showPassword ? EyeOn : EyeOff}
                alt={showPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
              />
            </ToggleButton>
          </InputWrapper>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <SubmitButton type="submit" disabled={!isValid}>
            로그인
          </SubmitButton>

          <Line />
        </Inputfield>
        <SocialButton bgColor=" #E5E7EB" color="#000">
          <img src="/src/assets/google.png" alt="Google" />
          Google 계정으로 로그인
        </SocialButton>

        <SocialButton bgColor="#FEE500">
          <img src="/src/assets/kakao.svg" alt="Kakao" />
          카카오 계정으로 로그인
        </SocialButton>

        <SocialButton bgColor="#03C75A" color="#fff">
          <img src="/src/assets/naver.png" alt="Naver" />
          네이버 계정으로 로그인
        </SocialButton>

        <Comment>
          이미 계정이 있으신가요? <CommentLink to="/signup/step1">회원가입</CommentLink>
        </Comment>
      </LoginContainer>
    </>
  );
}
