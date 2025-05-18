import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import lenis from "./lenisInstance";
import { useEffect } from "react";
import styled from "styled-components";
import ScrollToTop from "./ScrollToTop";
import useHeaderStore from "./stores/headerStore";

const ContentWrapper = styled.div`
  position: relative;
  padding-top: ${({ $headerHeight }) => `${$headerHeight}px`};
  /* padding-top: 180px; */
  transition: padding 0.2s;
  background: ${({ $mode }) => ($mode === "light" ? "#fff" : "#222")};
`;

const getMode = (pathname) => {
  if (pathname === "/login" || pathname === "/logon") return "hidden";
  if (pathname.startsWith("/store")) return "light";
  if (pathname.startsWith("/store/:productId")) return "light";
  if (pathname.startsWith("/event")) return "dark";
  if (pathname.startsWith("/payment")) return "light";
  if (pathname.startsWith("/mypage")) return "light";
  if (pathname.startsWith("/cart")) return "light";
  return "dark";
};

function Root() {
  const foldIfScrolled = useHeaderStore((state) => state.foldIfScrolled);
  const unfold = useHeaderStore((state) => state.unfold);
  const resetTransition = useHeaderStore((state) => state.resetTransition);
  const enableTransition = useHeaderStore((state) => state.enableTransition);
  const location = useLocation();
  const headerHeight = useHeaderStore((state) => state.headerHeight);

  const hideHeaderPath = ["/login", "/logon"];
  const isVisible = !hideHeaderPath.includes(location.pathname);

  const mode = getMode(location.pathname);

  //페이지 이동 시 헤더 헤더 펼치기
  useEffect(() => {
    unfold();
    resetTransition();
    setTimeout(() => {
      enableTransition();
    }, 50);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = ({ scroll }) => {
      foldIfScrolled(scroll);
    };

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.stop();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <ScrollToTop />
      {isVisible && (
        <>
          <Header mode={mode} />
          <ContentWrapper $mode={mode} $headerHeight={headerHeight}>
            <Outlet />
          </ContentWrapper>
          <Footer mode={mode} />
        </>
      )}
      {!isVisible && <Outlet />}
    </>
  );
}
export default Root;
