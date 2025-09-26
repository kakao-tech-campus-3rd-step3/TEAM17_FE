import styled from 'styled-components';

export const ImageUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 50%;
  height: 20rem;
  border: 2px solid ${({ theme }) => theme.colors.line.blue};
  border-radius: 5%;
  margin-bottom: 1.5rem;
`;
export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow-x: auto; 
  scroll-snap-type: x mandatory; 
  
  & > div {
    flex: 0 0 80%;
    height: 100%;
    scroll-snap-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.blue};
    border-radius: 10%;
  }
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

export const TextArea = styled.textarea`
  width: 90%;
  height: 90%;
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  font-family: inherit;
  background: ${({theme})=>theme.colors.background.default}
`;

export const Counter = styled.div`
  width: 60%;
  text-align: right;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.black};
`;
