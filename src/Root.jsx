import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  position: relative;
  padding-top: 180px;
  background: var(--bg);
`;

function Root() {
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  // const [prevScroll, setPrevScroll] = useState(0);
  const location = useLocation();
  const hideHeaderPath = ["/login", "/logon"];

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08, // 부드러움 정도
    });

    const handleScroll = ({ scroll }) => {
      if (scroll > 50) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }
    };

    // Lenis 이벤트로 스크롤값 받아서 상태 변경
    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      {!hideHeaderPath.includes(location.pathname) && (
        <>
          <Header isActive={isHeaderActive} />
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        </>
      )}
      {hideHeaderPath.includes(location.pathname) && <Outlet />}
    </>
  );
}

export default Root;
