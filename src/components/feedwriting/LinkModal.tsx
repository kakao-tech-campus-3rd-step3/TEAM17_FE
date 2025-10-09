import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import {
  Overlay,
  Modal,
  Header,
  RowWrapper,
  Desc,
  FormWrapper,
  FieldSet,
  Legend,
  RemoveButton,
  FormGroup,
  AddButton,
  Footer,
  CancelButton,
  SubmitButton,
  ErrorText,
} from '@/components/feedwriting/LinkModal.style';
import type { ProductForm } from '@/types/LinkWriteForm';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductForm) => void;
  defaultValues: ProductForm;
}

const LinkModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, defaultValues, reset]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Header>상품 링크 작성하기</Header>
        <RowWrapper>
          <Desc>- 상품명과 상품 링크, 상품 이미지는 "필수", 설명은 "선택"입니다.</Desc>
          <AddButton
            type="button"
            onClick={() => append({ name: '', url: '', description: '', imageFile: undefined })}
          >
            상품 추가
          </AddButton>
        </RowWrapper>

        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, idx) => (
              <FieldSet key={field.id}>
                <Legend>
                  상품 {idx + 1}
                  <RemoveButton type="button" onClick={() => remove(idx)}>
                    X
                  </RemoveButton>
                </Legend>

                <FormGroup>
                  <label>상품명</label>
                  <div className="input-wrapper">
                    <input
                      placeholder="상품명을 입력하세요 (필수)"
                      {...register(`products.${idx}.name`, { required: '상품명을 입력해주세요.' })}
                    />
                    {errors.products?.[idx]?.name && (
                      <ErrorText>{errors.products[idx].name?.message}</ErrorText>
                    )}
                  </div>
                </FormGroup>
                <FormGroup>
                  <label>상품링크</label>
                  <div className="input-wrapper">
                    <input
                      placeholder="상품링크를 입력하세요 (필수)"
                      {...register(`products.${idx}.url`, { required: '상품링크를 입력해주세요.' })}
                    />
                    {errors.products?.[idx]?.url && (
                      <ErrorText>{errors.products[idx].url?.message}</ErrorText>
                    )}
                  </div>
                </FormGroup>

                <FormGroup>
                  <label>상품설명</label>
                  <textarea
                    placeholder="상품설명을 입력하세요 (선택)"
                    {...register(`products.${idx}.description`)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    상품 이미지 <br /> (필수)
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      {...register(`products.${idx}.imageFile`, {
                        required: '이미지를 업로드해주세요.',
                      })}
                    />
                    {errors.products?.[idx]?.imageFile && (
                      <ErrorText>{errors.products[idx].imageFile?.message}</ErrorText>
                    )}
                  </div>
                </FormGroup>
              </FieldSet>
            ))}
            <Footer>
              <CancelButton type="button" onClick={onClose}>
                취소
              </CancelButton>
              <SubmitButton type="submit">작성 완료</SubmitButton>
            </Footer>
          </form>
        </FormWrapper>
      </Modal>
    </Overlay>
  );
};

export default LinkModal;
