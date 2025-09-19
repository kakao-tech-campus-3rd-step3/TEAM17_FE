import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { signup } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, type Step2Values } from '@/types/SignupZodSchema';

import {
  SignupContainer,
  Title,
  Container,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  NextButton,
  Comment,
  CommentLink,
  ErrorMessage,
} from '@/components/signup/SignupStep.style';

export default function SignupStep2() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Values>({
    mode: 'onChange',
    resolver: zodResolver(step2Schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: Step2Values) => {
    try {
      const step1 = JSON.parse(localStorage.getItem('signupStep1') || '{}');
      const finalData = { ...step1, ...data };

      const res = await signup(finalData);
      console.log('회원가입 성공:', res);

      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <SignupContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>회원가입</Title>
      <Container>
        <FormWrapper>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="text"
              {...register('email', { required: true })}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="text"
              {...register('password', { required: true })}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="text"
              {...register('confirmPassword', { required: true })}
              placeholder="비밀번호를 한번 더 제대로 입력해주세요"
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </FormGroup>

          <NextButton type="submit" disabled={!isValid}>
            회원가입
          </NextButton>
        </FormWrapper>
      </Container>
      <Comment>
        이미 계정이 있으신가요? <CommentLink to="/login">로그인</CommentLink>
      </Comment>
    </SignupContainer>
  );
}
