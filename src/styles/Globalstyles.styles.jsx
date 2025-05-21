import { createGlobalStyle } from "styled-components";
import Gmarketsans from "../font/GmarketSansTTFBold.ttf";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  :root {
    --light: #fff;
    --dark: #111;
    --bg: #222;
    --main:#FFEC00;
    --gray1: #111;
    --gray3: #333;
    --gray6: #666;
    --gray8: #888;
    --grayC: #ccc;
    --grayD: #ddd;
    --grayE: #eee;
    --grayF5: #f5f5f5;
    --grayFA: #fafafa;
    --red: #E22531;
    --eventtext: #0068ae;
  }

  @font-face {
      font-family: 'GmarketSans';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'GmarketSans';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
  }

  html {
    font-size: 62.5%;
  }

  html.modal-open {
  overflow: hidden !important;
  height: 100%;
  }

  body {
    font-family: "Figtree", "Pretendard", sans-serif;
    font-size: 1.6rem;
  }

  #root {
    height: 100%;
  }

  .inner {
    margin: 0 5%;

    @media screen and (max-width: 1024px) {
      margin: 0 3%;
    }
    @media screen and (max-width: 500px) {
      margin: 0 15px;
    }
  }

  .bJeycj{
    border: none !important;
  }
  .iqcOxY:not(:last-of-type) {
    border-bottom: none;
  }

`;

export default GlobalStyles;
