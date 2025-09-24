import styled from 'styled-components';

export const ImageUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 40%;
  height: 25rem;
  border: 2px solid ${({ theme }) => theme.colors.line.blue};

  margin-bottom: 2rem;
`;
