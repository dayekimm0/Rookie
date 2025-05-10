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
    src: url(${Gmarketsans}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Figtree", "Pretendard", "Gmarketsans", sans-serif;
    font-size: 1.6rem;
  }


  #root {
    height: 100%;
  }
  
  .inner {
    margin: 0 5%;

    @media screen and (max-width: 1024px) {
      
    }
  }
.dIZTvc  {
  border-bottom: none;
}
.iqcOxY:not(:last-of-type) {
  border-bottom: none;
}
`;

export default GlobalStyles;
