import { useForm } from 'react-hook-form';
import type { Step2Values } from '@/types/SignupType';

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
} from '@/components/signup/SignupStep1.style';

export default function SignupStep2() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step2Values>({ mode: 'onChange' });

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
            {errors.email && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="text"
              {...register('password', { required: true })}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.password && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="text"
              {...register('confirmPassword', { required: true })}
              placeholder="비밀번호를 한번 더 제대로 입력해주세요"
            />
            {errors.confirmPassword && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
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
