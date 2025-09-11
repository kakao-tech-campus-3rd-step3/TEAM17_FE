import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Values } from '@/types/SignupZodSchema';

import {
  SignupContainer,
  Title,
  Container,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  RadioGroup,
  Date,
  Select,
  NextButton,
  Comment,
  CommentLink,
  ErrorMessage,
} from '@/components/signup/SignupStep.style';

export default function SignupStep1() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1Values>({
    mode: 'onChange',
    resolver: zodResolver(step1Schema),
  });

  const onNext = (data: Step1Values) => {
    // Step1 데이터를 저장 (localStorage)
    localStorage.setItem('signupStep1', JSON.stringify(data));
    navigate('/signup/step2');
  };

  return (
    <>
      <SignupContainer onSubmit={handleSubmit(onNext)}>
        <Title>회원가입</Title>
        <Container>
          <FormWrapper>
            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                {...register('name', { required: true })}
                placeholder="이름을 입력해주세요"
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>
            <RadioGroup>
              <FormGroup>
                <Label>생년월일</Label>
                <Date
                  type="date"
                  {...register('birthDate', { required: true })}
                  placeholder="-/-/-"
                />
                {errors.birthDate && <ErrorMessage>{errors.birthDate.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>성별</Label>
                <Select {...register('gender', { required: true })} defaultValue="">
                  <option value="" disabled>
                    성별을 선택하세요
                  </option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </Select>
                {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
              </FormGroup>
            </RadioGroup>
            <FormGroup>
              <Label>전화번호</Label>
              <Input
                type="text"
                {...register('telephone', { required: true })}
                placeholder="전화번호를 입력해주세요"
              />
              {errors.telephone && <ErrorMessage>{errors.telephone.message}</ErrorMessage>}
            </FormGroup>

            <NextButton type="submit" disabled={!isValid}>
              다음
            </NextButton>
          </FormWrapper>
        </Container>
        <Comment>
          이미 계정이 있으신가요? <CommentLink to="/login">로그인</CommentLink>
        </Comment>
      </SignupContainer>
    </>
  );
}
