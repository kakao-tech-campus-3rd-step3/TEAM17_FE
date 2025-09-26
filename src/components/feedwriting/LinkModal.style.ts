import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: ${tokens.colors.background.default};
  padding: 20px;
  width: 50%;
  max-height: 100%;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  color: ${tokens.colors.text.blue.default};
  font-weight: 800;
  font-size: 1.5rem;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AddButton = styled.button`
  font-weight: 200;
  font-size: 1rem;
  width: 6rem;
  border: none;
  border-radius: 10px;
  background-color: ${tokens.colors.blue};
  color: ${tokens.colors.text.white};
  padding: 0.2rem;
`;

export const Desc = styled.div`
  font-size: 1rem;

  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.blue.disabled};
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid ${tokens.colors.line.blue};
  border-radius: 10px;
  margin: 0.7rem 0.5rem 0.7rem 0.5rem;
  padding: 0.7rem;
`;

export const FieldSet = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  input,
  textarea {
    display: block;
    width: 100%;
    padding: 8px;
    border: 1px solid ${tokens.colors.line.disabled};
    border-radius: 6px;
  }
`;

export const Legend = styled.legend`
  font-weight: bold;
  color: ${tokens.colors.text.blue.default};
`;

export const RemoveButton = styled.button`
  margin-left: 0.2rem;
  color: ${tokens.colors.text.blue.default};
  font-size: 0.9rem;
  border: none;
  background-color: ${tokens.colors.background.default};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;

  label {
    display: flex;
    align-items: flex-start;
    padding-top: 0.2rem;
    width: 5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${tokens.colors.text.blue.default};
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid ${tokens.colors.line.disabled};
    border-radius: 6px;
    font-size: 0.9rem;

    &::placeholder {
      color: ${tokens.colors.text.blue.disabled}; /* placeholder 색상 */
      font-size: 0.85rem;
    }
  }

  textarea {
    min-height: 60px;
    resize: vertical;
  }
`;
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;
