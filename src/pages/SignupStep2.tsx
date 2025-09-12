import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  ErrorMessage,ToggleButton,InputWrapper
} from '@/components/signup/SignupStep.style';

import EyeOn from '@/assets/icon-eye.svg';
import EyeOff from '@/assets/icon-eye-off.svg';

export default function SignupStep2() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Values>({
    mode: 'onChange',
    resolver: zodResolver(step2Schema),
  });

 const [showPassword, setShowPassword] = useState(false);
  
 const onSubmit = (data: Step2Values) => {
    //step1+step2 데이터 합쳐서 최종 제출
    const step1 = JSON.parse(localStorage.getItem('signupStep1') || '{}');
    const finalData = { ...step1, ...data };

    alert(JSON.stringify(finalData, null, 2));
    //여기서 API 요청(호출) 보내기 -> finalData 전달
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
            <InputWrapper>
            <Input
              type="text"
              {...register('password', { required: true })}
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
          </FormGroup>

          <FormGroup>
            <Label>비밀번호 확인</Label>
            <InputWrapper>
            <Input
              type="text"
              {...register('confirmPassword', { required: true })}
              placeholder="비밀번호를 한번 더 제대로 입력해주세요"
            />
            <ToggleButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
              <img
                src={showPassword ? EyeOn : EyeOff}
                alt={showPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
              />
            </ToggleButton>
            </InputWrapper>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
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
