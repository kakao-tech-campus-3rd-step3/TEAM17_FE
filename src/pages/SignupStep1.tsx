import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { Step1Values } from '@/types/SignupType';
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
} from '@/components/signup/SignupStep1.style';

export default function SignupStep1() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step1Values>({ mode: 'onChange' });

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
              {errors.name && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
            </FormGroup>
            <RadioGroup>
              <FormGroup>
                <Label>생년월일</Label>
                <Date
                  type="date"
                  {...register('birthDate', { required: true })}
                  placeholder="-/-/-"
                />
                {errors.birthDate && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
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
                {errors.gender && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
              </FormGroup>
            </RadioGroup>
            <FormGroup>
              <Label>전화번호</Label>
              <Input
                type="text"
                {...register('telephone', { required: true })}
                placeholder="전화번호를 입력해주세요"
              />
              {errors.telephone && <ErrorMessage>필수로 채워야 하는 항목입니다.</ErrorMessage>}
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
