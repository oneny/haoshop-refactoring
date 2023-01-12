import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.4rem;

    @media screen and (max-width: 798px) {
      font-size: 1.3rem;
    }

    @media screen and (max-width: 798px) {
      font-size: 1.1rem;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, button {
    border: none;
    background: none;
    font-size: inherit;
    font: inherit;
    outline: none;
  }
  button {
    cursor: pointer;
  }
  /* PC, 모바일용으로 사용된 이미지 내에서 의미있는 텍스트의 대체텍스트를 제공할 떄 */
  .ir {
    display: block;
    overflow: hidden;
    font-size: 1px;
    line-height: 0;
    text-indent: -9999px;
    color: transparent;
  }
`;
