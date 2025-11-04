import styled from 'styled-components';
import { X, Star, ShoppingCart } from 'lucide-react';

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

export const Shell = styled.div`
  background: #fff;
  border-radius: 1rem;
  width: 100%;
  max-width: 60rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.18);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 0.0625rem solid #e5e7eb;
  .left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.75rem;
    object-fit: cover;
  }
  h2 {
    font-size: 1.375rem;
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
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #f3f4f6;
  }
`;

export const CloseIcon = styled(X)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Body = styled.div`
  padding: 1.5rem;
`;

export const PriceBox = styled.div`
  background: linear-gradient(90deg, #eff6ff, #eef2ff);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .badge {
    background: #ef4444;
    color: #fff;
    padding: 0.375rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
  }
  .original {
    color: #6b7280;
    text-decoration: line-through;
    font-size: 1rem;
  }
  .sale {
    font-size: 1.75rem;
    font-weight: 800;
    color: #111827;
  }
  .desc {
    color: #6b7280;
  }
  .save {
    color: #16a34a;
    font-weight: 700;
    margin-left: 0.5rem;
  }
  .rating {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    justify-content: flex-end;
  }
  .review {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

export const RatingStar = styled(Star)`
  width: 1.25rem;
  height: 1.25rem;
  color: #f59e0b;
  fill: #f59e0b;
`;

export const RatingValue = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
`;

export const Products = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 800;
    color: #111827;
    margin: 0 0 0.75rem;
  }
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 48rem) {
    grid-template-columns: 1fr 1fr;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 0.0625rem solid #e5e7eb;
    border-radius: 0.75rem;
    transition: background 0.2s ease;
    &:hover {
      background: #f9fafb;
    }
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 0.625rem;
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
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 0.0625rem solid #e5e7eb;
  button {
    flex: 1;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
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
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
`;
