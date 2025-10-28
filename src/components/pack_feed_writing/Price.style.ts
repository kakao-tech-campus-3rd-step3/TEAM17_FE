import styled from 'styled-components';

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PriceBox = styled.div`
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.line.blue};
  width: 60%;
  padding: 0.5rem;
`;

export const Priceinput = styled.input`
border: none;
outline: none;
font-size: 1rem;
width: 100%;
`;