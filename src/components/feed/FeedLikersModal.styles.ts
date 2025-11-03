import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  backdrop-filter: blur(4px);
`;

export const ModalShell = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #111827;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: color 0.2s;

  &:hover {
    color: #111827;
  }
`;

export const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

export const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background: none;
  border: none;
  border-top: 1px solid #e5e7eb;
  cursor: pointer;
  color: #2563eb;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const LoadingContainer = styled.div`
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;
