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

  :root {
    --light: #fff;
    --dark: #111;
    --bg: #222;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Figtree", "Pretendard", sans-serif;
    font-size: 1.6rem;
  }

  .inner {
    margin: 0 5%;

    @media screen and (max-width: 1024px) {
      
    }
  }
`;

export default GlobalStyles;
