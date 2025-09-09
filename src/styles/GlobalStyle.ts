import { createGlobalStyle } from "styled-components";
import 'pretendard/dist/web/static/pretendard.css';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body { 
    margin: 0; 
    line-height: 1.5;
    font-family: 'Pretendard', sans-serif;
    background-color: #fff;
    color: #111;
  }

  img, picture { max-width: 100%; display: block; }
  button, input, textarea, select { font: inherit; }
`;
