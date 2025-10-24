import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: ${tokens.colors.background.default};
  border-radius: 12px;
  padding: 1.5rem;
  width: 25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    text-align: center;
  }
`;

export const ImageUploadBox = styled.div`
  width: 40%;
  height: 40%;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 2rem;
  position: relative;
  border: 2px dashed ${tokens.colors.text.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${tokens.colors.background.lightGray};

  &:hover {
    border-color: ${tokens.colors.blue};
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FileInput = styled.input`
  display: none;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 0.625rem; 
  padding: 0.5rem;
  border-radius: 0.375rem; 
  border: 0.0625rem solid #ddd;
  font-size: 0.875rem; 

  &:focus {
    outline: none;
    border-color: #555;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 5rem;
  margin-top: 0.625rem;
  padding: 0.5rem; 
  border-radius: 0.375rem; 
  border: 0.0625rem solid #ddd; 
  font-size: 0.875rem; 
  resize: none;

  &:focus {
    outline: none;
    border-color: #555;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem; 
  justify-content: flex-end;
`;

export const ActionButton = styled.button<{ $secondary?: boolean }>`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem; 
  border: none;
  cursor: pointer;
  background-color: ${({ $secondary }) => ($secondary ? '#eee' : '#174A7E')};
  color: ${({ $secondary }) => ($secondary ? '#333' : '#fff')};
  transition: 0.2s;

  &:hover {
    background-color: ${({ $secondary }) => ($secondary ? '#ddd' : '#133a63')};
  }
`;