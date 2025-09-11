import styled from '@emotion/styled';

export const Wrap = styled.div`
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #ffedd5;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  color: #4b5563;
`;
