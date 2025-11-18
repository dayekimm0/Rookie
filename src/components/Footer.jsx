import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import LogoSvg from "./LogoSvg";
import Footerbtns from "./FooterItem/Footerbtns";
import FooterInfo from "./FooterItem/FooterInfo";
import FooterTerms from "./FooterItem/FooterTerms";
import FooterSns from "./FooterItem/FooterSns";

const Container = styled.footer`
  padding-top: ${({ $pathname }) => ($pathname !== "/event" ? "95px" : "0")};
  background: ${({ mode }) => (mode === "light" ? "#fff" : "var(--bg)")};
  position: relative;
  color: var(--gray8);
  @media screen and (max-width: 1600px) {
    padding-top: ${({ $pathname }) => ($pathname === "/event" ? "0" : "95px")};
  }
  @media screen and (max-width: 1024px) {
    padding-top: ${({ $pathname }) => ($pathname === "/event" ? "0" : "75px")};
  }
  @media screen and (max-width: 768px) {
    padding-top: ${({ $pathname }) => ($pathname === "/event" ? "0" : "60px")};
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
    }
  }
`;

const Footer = memo(({ mode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  const isPaymentPage = pathname === "/payment";
  const isCartPage = pathname === "/cart";

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const shouldBeVisible = currentY > 300;
    setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));
  }, []);

  useEffect(() => {
    let frame;

    const loop = () => {
      handleScroll();
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [handleScroll]);

  return (
    <Container mode={mode} $pathname={pathname}>
      {!isPaymentPage && !isCartPage && (
        <Footerbtns mode={mode} isVisible={isVisible} />
      )}
      <div className="inner">
        <div className="footer_wrap">
          <figure>
            <LogoSvg />
          </figure>
          <FooterTerms />
          <FooterInfo />
          <FooterSns mode={mode} />
        </div>
      </div>
    </Container>
  );
});

export default Footer;
