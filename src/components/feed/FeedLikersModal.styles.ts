import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(0.25rem);
`;

export const ModalShell = styled.div`
  background: ${tokens.colors.background.default};
  border-radius: 1rem;
  width: 100%;
  max-width: 30rem;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 0.0625rem solid ${tokens.colors.line.gray};
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${tokens.colors.text.black};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.text.lightGray};
  transition: color 0.2s;

  &:hover {
    color: ${tokens.colors.text.black};
  }
`;

export const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${tokens.colors.background.lightGray};
  }
`;

export const UserAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${tokens.colors.text.black};
`;

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: ${tokens.colors.text.lightGray};
  font-size: 0.875rem;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-top: 0.0625rem solid ${tokens.colors.line.gray};
  cursor: pointer;
  color: ${tokens.colors.blue};
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${tokens.colors.background.lightGray};
  }

  &:disabled {
    color: ${tokens.colors.text.lightGray};
    cursor: not-allowed;
  }
`;

export const LoadingContainer = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: ${tokens.colors.text.lightGray};
  font-size: 0.875rem;
`;
