import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import lenis from "../lenisInstance";
import LogoSvg from "./LogoSvg";

const Container = styled.footer`
  padding-top: ${({ $pathname }) => ($pathname !== "/event" ? "95px" : "0")};
  background: ${({ mode }) => (mode === "light" ? "#fff" : "#222")};
  position: relative;
  color: var(--gray8);
  @media screen and (max-width: 1024px) {
    padding-top: ${({ $pathname }) => ($pathname !== "/event" ? "75px" : "0")};
  }
  @media screen and (max-width: 768px) {
    padding-top: ${({ $pathname }) => ($pathname !== "/event" ? "65px" : "0")};
  }

  .inner {
    padding: 65px 0;
    border: ${({ $pathname }) => ($pathname !== "/event" ? "1px" : "0px")};
    border-top-style: solid;
    border-top-color: ${({ mode }) => (mode === "light" ? "#ccc" : "#888")};

    @media screen and (max-width: 1024px) {
      padding: 45px 0;
    }
    @media screen and (max-width: 768px) {
      padding: 35px 0;
    }
    @media screen and (max-width: 500px) {
      padding: 30px 0;
    }

    .footer_wrap {
      position: relative;

      figure {
        svg {
          width: 130px;
          path {
            fill: ${({ mode }) => (mode === "light" ? "#666" : "#888")};
          }
        }

        @media screen and (max-width: 1024px) {
          svg {
            width: 110px;
          }
        }
        @media screen and (max-width: 768px) {
          svg {
            width: 90px;
          }
        }
      }

      .terms {
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
      }

      .footerDesc {
        margin-top: 45px;
        p {
          font-size: 1.6rem;
          line-height: 1.5;
          span {
            &::after {
              content: "|";
              display: inline-block;
            }
            &:last-child {
              &::after {
                display: none;
              }
            }
          }
        }

        .copyright {
          font-size: 1.6rem;
          margin-top: 24px;
          line-height: 1.2;
        }

        @media screen and (max-width: 1024px) {
          margin-top: 30px;
          p {
            font-size: 1.2rem;
            .block1024 {
              display: block;
              &::after {
                display: none;
              }
            }
          }
          .copyright {
            font-size: 1.1rem;
          }
        }
        @media screen and (max-width: 768px) {
          margin-top: 25px;
          p {
            .block768 {
              display: block;
              &::after {
                display: none;
              }
            }
          }
          .copyright {
            font-size: 1.1rem;
          }
        }
        @media screen and (max-width: 500px) {
          p {
            .block500 {
              display: block;
              &::after {
                display: none;
              }
            }
          }

          .copyright {
            font-size: 1rem;
          }
        }
      }

      .snsBtns {
        position: absolute;
        right: 0%;
        bottom: 0;
        display: flex;
        gap: 20px;
        font-size: 0;
        li {
          cursor: pointer;
          svg {
            width: 24px;
            path {
              fill: ${({ mode }) => (mode === "light" ? "#ccc" : "#888")};
            }
          }
        }

        @media screen and (max-width: 1024px) {
          gap: 18px;
          li {
            svg {
              width: 22px;
            }
          }
        }
        @media screen and (max-width: 768px) {
          gap: 16px;
          li {
            svg {
              width: 20px;
            }
          }
        }
        @media screen and (max-width: 500px) {
          gap: 10px;
          li {
            svg {
              width: 18px;
            }
          }
        }
      }
    }
  }
`;

const Upbtn = styled.div.attrs((props) => ({
  style: {
    bottom: `${props.$bottom}px`,
  },
}))`
  position: fixed;
  z-index: 100;
  right: 5%;
  width: 48px;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ mode }) => (mode === "light" ? "#aaa" : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s;
  cursor: pointer;
  svg {
    width: 22px;
    path {
      stroke: ${({ mode }) => (mode === "light" ? "#888" : "#fff")};
    }
  }
  @media screen and (max-width: 1024px) {
    right: 3%;
    width: 44px;
    svg {
      width: 18px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 37px;
    bottom: 20px;
    svg {
      width: 16px;
    }
  }
  @media screen and (max-width: 500px) {
    right: 15px;
  }
`;

const Footer = ({ mode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(30);
  const { pathname } = useLocation();
  const footerRef = useRef();
  const topBtnRef = useRef();

  const isPaymentPage = pathname === "/payment";
  const isCartPage = pathname === "/cart";

  useEffect(() => {
    let frame;

    const loop = () => {
      const current = window.scrollY;
      const overThreshold = current > 300;

      setIsVisible((prev) => (prev !== overThreshold ? overThreshold : prev));

      const footer = footerRef.current;
      const topBtn = topBtnRef.current;

      if (footer && topBtn) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight - 20) {
          const distanceFromBottom = windowHeight - footerTop + 20;
          setBottomOffset(distanceFromBottom);
        } else {
          setBottomOffset(30);
        }
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToTop = () => {
    lenis.scrollTo(0); // Lenis scrollTop
  };

  return (
    <Container mode={mode} $pathname={pathname}>
      {!isPaymentPage && !isCartPage && (
        <Upbtn
          onClick={scrollToTop}
          ref={topBtnRef}
          mode={mode}
          $isVisible={isVisible}
          $bottom={bottomOffset}
          data-lenis-prevent
        >
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
            <path
              d="M22.8333 12.4206L12 1.58728L1.16667 12.4206"
              stroke="#666666"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 1.95544V24.4126"
              stroke="#666666"
              strokeWidth="1.66667"
              strokeLinecap="round"
            />
          </svg>
        </Upbtn>
      )}
      <div className="inner" ref={footerRef}>
        <div className="footer_wrap">
          <figure>
            <LogoSvg />
          </figure>
          <ul className="terms">
            <li>
              <span>이용약관</span>
            </li>
            <li>
              <span>개인정보처리방침</span>
            </li>
            <li>
              <span> 이용안내</span>
            </li>
          </ul>
          <div className="footerDesc">
            <p>상호명 : 주식회사 루키 | 대표 : 김다예, 장효아</p>
            <p>
              <span className="block768">사업자등록번호 : 123-45-67891 </span>
              <span className="block500">
                {" "}
                통신판매업신고번호 : 제2025-서울서초구-1234호{" "}
              </span>
              <span> 개인정보관리자 : 김다예</span>
            </p>
            <p>
              <span className="block768">E-MAIL : info@rookie.co.kr </span>
              <span className="block768">
                {" "}
                주소 : 서울 서초구 서초대로77길 41 대동2빌딩 9층
              </span>
            </p>
            <p>
              <span className="block1024">
                TEL : 02)532-1200 | FAX : 02)532-1203{" "}
              </span>
              <span className="block768">
                {" "}
                고객센터 : 1566-1234 평일 09시~17시{" "}
              </span>
              <span className="block768">
                {" "}
                점심시간 13시~14시 주말 공휴일 휴무
              </span>
            </p>
            <h6 className="copyright">
              COPYRIGHT© ROOkie. ALL RIGHTS RESERVED
            </h6>
          </div>
          <ul className="snsBtns">
            <li>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path
                  d="M18 2.19043H15C13.6739 2.19043 12.4021 2.71721 11.4645 3.6549C10.5268 4.59258 10 5.86435 10 7.19043V10.1904H7V14.1904H10V22.1904H14V14.1904H17L18 10.1904H14V7.19043C14 6.92521 14.1054 6.67086 14.2929 6.48332C14.4804 6.29579 14.7348 6.19043 15 6.19043H18V2.19043Z"
                  fill="#CCCCCC"
                />
              </svg>
            </li>
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 2C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H17ZM12.7178 7.40723C11.7609 7.26537 10.7835 7.42856 9.9248 7.87402C9.0663 8.31959 8.36952 9.02473 7.93457 9.88867C7.49982 10.7527 7.3474 11.7325 7.50098 12.6875C7.65476 13.6426 8.10599 14.5259 8.79004 15.21C9.47414 15.894 10.3574 16.3453 11.3125 16.499C12.2675 16.6526 13.2473 16.5002 14.1113 16.0654C14.9752 15.6305 15.6804 14.9337 16.126 14.0752C16.5714 13.2166 16.7346 12.239 16.5928 11.2822C16.448 10.3061 15.9937 9.40192 15.2959 8.7041C14.5981 8.00626 13.694 7.55201 12.7178 7.40723ZM10.4766 8.93945C11.1113 8.6101 11.8346 8.48889 12.542 8.59375C13.2635 8.7008 13.9315 9.03699 14.4473 9.55273C14.9629 10.0685 15.2992 10.7366 15.4062 11.458C15.511 12.1653 15.3899 12.8888 15.0605 13.5234C14.7311 14.1578 14.2097 14.6728 13.5713 14.9941C12.9327 15.3154 12.2087 15.427 11.5029 15.3135C10.797 15.1998 10.1443 14.8669 9.63867 14.3613C9.1331 13.8557 8.80021 13.203 8.68652 12.4971C8.57297 11.7913 8.68464 11.0673 9.00586 10.4287C9.32723 9.79022 9.8422 9.26885 10.4766 8.93945ZM17.5 5.90039C17.1686 5.90039 16.9004 6.16863 16.9004 6.5C16.9004 6.83137 17.1686 7.09961 17.5 7.09961H17.5098L17.6309 7.08789C17.9043 7.03197 18.1104 6.78998 18.1104 6.5C18.1104 6.21002 17.9043 5.96803 17.6309 5.91211L17.5098 5.90039H17.5Z"
                  fill="#CCCCCC"
                />
              </svg>
            </li>
            <li>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path
                  d="M17.575 3L12.579 8.711L8.259 3H2L9.477 12.776L2.391 20.875H5.425L10.894 14.625L15.674 20.875H21.776L13.982 10.571L20.607 3H17.575ZM16.511 19.06L5.542 4.719H7.345L18.191 19.059L16.511 19.06Z"
                  fill="#CCCCCC"
                />
              </svg>
            </li>
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.0005 4C12.0545 4.00001 18.8868 4.0016 20.6001 4.41992C21.0707 4.55306 21.4978 4.80819 21.8384 5.15918C22.179 5.51035 22.4217 5.94533 22.5405 6.41992C22.8578 8.17862 23.0117 9.96296 23.0005 11.75C23.0068 13.5103 22.8529 15.2676 22.5405 17C22.4217 17.4746 22.179 17.9096 21.8384 18.2607C21.4978 18.6118 21.0707 18.8669 20.6001 19C18.8868 19.4582 12.0545 19.46 12.0005 19.46C12.0005 19.46 5.1199 19.46 3.3999 19C2.9389 18.8738 2.51797 18.6311 2.17822 18.2949C1.83842 17.9586 1.59142 17.5399 1.46045 17.0801C1.14322 15.3214 0.989268 13.537 1.00049 11.75C0.991724 9.97631 1.14566 8.20552 1.46045 6.45996C1.57925 5.98541 1.82102 5.55036 2.16162 5.19922C2.50217 4.84819 2.92931 4.59314 3.3999 4.45996C5.1199 3.99996 12.0005 4 12.0005 4ZM9.75049 15.0195L15.5005 11.75L9.75049 8.48047V15.0195Z"
                  fill="#CCCCCC"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
