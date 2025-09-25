import styled from 'styled-components';

export const ImageUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 30%;
  height: 20rem;
  border: 2px solid ${({ theme }) => theme.colors.line.blue};
  border-radius: 10%;
  margin-bottom: 1.5rem;
`;

export const ContentLinkUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 60%;
  height: 20rem;
  border: 2px solid ${({ theme }) => theme.colors.line.blue};
  border-radius: 10%;
  margin-bottom: 1rem;
`;
