import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TeamhomeBtn from "./TeamhomeBtn";

const UpbtnWrap = styled.div`
  position: ${({ $fixed }) => ($fixed ? "fixed" : "absolute")};
  bottom: ${({ $fixed }) => ($fixed ? "25px" : "auto")};
  transform: ${({ $fixed }) =>
    $fixed ? "none" : "translateY(calc(-100% - 20px))"};
  height: auto;
  right: 25px;
  z-index: 88;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 1600px) {
    right: 5%;
  }
  @media screen and (max-width: 1024px) {
    right: 3%;
  }
  @media screen and (max-width: 768px) {
    bottom: ${({ $fixed }) => ($fixed ? "15px" : "auto")};
    transform: ${({ $fixed }) =>
      $fixed ? "none" : "translateY(calc(-100% - 15px))"};
    gap: 5px;
  }
  @media screen and (max-width: 500px) {
    right: 15px;
    transform: ${({ $fixed }) =>
      $fixed ? "none" : "translateY(calc(-100% - 12px))"};
  }
`;

const Upbtn = styled.div`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ $mode }) => ($mode === "light" ? "#aaa" : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  svg {
    width: 22px;
    path {
      stroke: ${({ $mode }) => ($mode === "light" ? "#888" : "#fff")};
    }
  }

  @media screen and (max-width: 1024px) {
    width: 44px;
    svg {
      width: 18px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 37px;
    svg {
      width: 16px;
    }
  }
`;

const Footerbtns = ({ mode, isVisible }) => {
  const [isFixed, setIsFixed] = useState(true);
  const { pathname } = useLocation();

  const isTeamhome = pathname.startsWith("/teamhome");

  const scrollToTop = () => {
    lenis.scrollTo(0); // Lenis scrollTop
  };

  useEffect(() => {
    let frame;

    const loop = () => {
      const scrollY = window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;
      const screenWidth = window.innerWidth;

      if (screenWidth <= 1600) {
        const footerEl = document.querySelector("footer > .inner");
        if (footerEl) {
          const footerTop = footerEl.getBoundingClientRect().top + scrollY;
          const distance = footerTop - viewportBottom;

          setIsFixed(distance > 0);
        }
      } else {
        setIsFixed(true);
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <UpbtnWrap $fixed={isFixed}>
      {isTeamhome && <TeamhomeBtn mode={mode} isVisible={isVisible} />}
      <Upbtn
        onClick={scrollToTop}
        $mode={mode}
        $isVisible={isVisible}
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
    </UpbtnWrap>
  );
};

export default Footerbtns;
