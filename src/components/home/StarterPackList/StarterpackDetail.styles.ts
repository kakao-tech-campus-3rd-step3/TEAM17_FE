import styled from '@emotion/styled';
import { X, Star, ShoppingCart } from 'lucide-react';

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

export const Shell = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  .left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  img {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    object-fit: cover;
  }
  h2 {
    font-size: 22px;
    font-weight: 800;
    color: #111827;
    margin: 0;
  }
  p {
    color: #6b7280;
    margin: 0;
  }
`;

export const CloseBtn = styled.button`
  border: none;
  background: transparent;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #f3f4f6;
  }
`;

export const CloseIcon = styled(X)`
  width: 24px;
  height: 24px;
`;

export const Body = styled.div`
  padding: 24px;
`;

export const PriceBox = styled.div`
  background: linear-gradient(90deg, #eff6ff, #eef2ff);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .badge {
    background: #ef4444;
    color: #fff;
    padding: 6px 10px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
  }
  .original {
    color: #6b7280;
    text-decoration: line-through;
    font-size: 16px;
  }
  .sale {
    font-size: 28px;
    font-weight: 800;
    color: #111827;
  }
  .desc {
    color: #6b7280;
  }
  .save {
    color: #16a34a;
    font-weight: 700;
    margin-left: 8px;
  }
  .rating {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: flex-end;
  }
  .review {
    color: #6b7280;
    font-size: 14px;
  }
`;

export const RatingStar = styled(Star)`
  width: 20px;
  height: 20px;
  color: #f59e0b;
  fill: #f59e0b;
`;

export const RatingValue = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

export const Products = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 800;
    color: #111827;
    margin: 0 0 12px;
  }
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    transition: background 0.2s ease;
    &:hover {
      background: #f9fafb;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      object-fit: cover;
    }
    h4 {
      margin: 0;
      font-weight: 700;
      color: #111827;
    }
    .price {
      color: #2563eb;
      font-weight: 700;
    }
    .content {
      flex: 1;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  button {
    flex: 1;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 800;
    cursor: pointer;
  }
  .primary {
    border: none;
    background: #2563eb;
    color: #fff;
    &:hover {
      background: #1d4ed8;
    }
  }
  .secondary {
    border: none;
    background: #111827;
    color: #fff;
    &:hover {
      background: #0f172a;
    }
  }
`;

export const CartIcon = styled(ShoppingCart)`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
