import { memo } from "react";
import styled from "styled-components";

const Terms = styled.ul`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;

  li {
    font-size: 1.6rem;
    line-height: 1.4;
    position: relative;
    span {
      cursor: pointer;
    }
    &::after {
      content: "|";
      display: inline-block;
      margin: 0 5px;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    li {
      font-size: 1.2rem;
      &::after {
        margin: 0 3px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    li {
      font-size: 1.1rem;
      &::after {
        margin: 0 3px;
      }
    }
  }
`;

const FooterTerms = memo(() => {
  return (
    <Terms>
      <li>
        <span>이용약관</span>
      </li>
      <li>
        <span>개인정보처리방침</span>
      </li>
      <li>
        <span>이용안내</span>
      </li>
    </Terms>
  );
});

export default FooterTerms;
