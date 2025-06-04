import { createGlobalStyle } from "styled-components";
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

  button {
    font-family: "Figtree", "Pretendard", sans-serif;
  }

  :root {
    --light: #fff;
    --dark: #111;
    --bg: #111;
    --main:#FFEC00;
    --gray1: #111;
    --gray2: #222;
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
