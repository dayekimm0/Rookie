import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import lenis from "./lenisInstance";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ScrollToTop from "./ScrollToTop";
import useHeaderStore from "./stores/headerHeightStore";
import authStore from "./stores/AuthStore";
import { getFoldState } from "./stores/headersStore";

const ContentWrapper = styled.div`
  position: relative;
  /* padding-top: 177px; */
  padding-top: ${({ $foldState, $headerHeight }) =>
    $foldState === "open"
      ? "177px"
      : $foldState === "auto"
      ? "calc(177px - 30px)"
      : `${$headerHeight}px`};
  transition: padding 0.2s;
  background: ${({ $mode }) =>
    $mode === "light" ? "var(--light)" : "var(--bg)"};

  @media screen and (max-width: 1024px) {
    /* padding-top: 138.67px; */
    padding-top: ${({ $foldState, $headerHeight }) =>
      $foldState === "open"
        ? "138.67px"
        : $foldState === "auto"
        ? "calc(138.67px - 10px)"
        : `${$headerHeight}px`};
  }
  @media screen and (max-width: 500px) {
    /* padding-top: 120.78px; */
    padding-top: ${({ $foldState, $headerHeight }) =>
      $foldState === "open"
        ? "120.78px"
        : $foldState === "auto"
        ? "calc(120.78px - 10px)"
        : `${$headerHeight}px`};
  }
`;

const getMode = (pathname) => {
  if (pathname === "/login" || pathname === "/logon") return "hidden";
  if (pathname.startsWith("/store")) return "light";
  if (pathname.startsWith("/event")) return "dark";
  if (pathname.startsWith("/payment")) return "light";
  if (pathname.startsWith("/mypage")) return "light";
  if (pathname.startsWith("/cart")) return "light";
  if (pathname.startsWith("/teamhome")) return "dark";
  if (pathname.startsWith("/play")) return "dark";
  return "dark";
};

function Root() {
  const { user, userProfile, isLoading } = authStore();
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);
  const foldIfScrolled = useHeaderStore((state) => state.foldIfScrolled);
  const unfold = useHeaderStore((state) => state.unfold);
  const resetTransition = useHeaderStore((state) => state.resetTransition);
  const enableTransition = useHeaderStore((state) => state.enableTransition);
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const isScrollLocked = useHeaderStore((s) => s.isScrollLocked);
  const isManuallyClosed = useHeaderStore((s) => s.isManuallyClosed);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  const hideHeaderPath = ["/login", "/logon"];
  const isVisible = !hideHeaderPath.includes(location.pathname);

  const mode = getMode(location.pathname);

  if (!user && userProfile && !isLoading) {
    localStorage.removeItem("auth-storage");
    location.reload();
    return null;
  }

  const foldState = useMemo(
    () => getFoldState(scrollY, isFolded, isScrollLocked, isManuallyClosed),
    [scrollY, isFolded, isScrollLocked, isManuallyClosed]
  );

  //페이지 이동 시 헤더 헤더 펼치기
  useEffect(() => {
    unfold();
    resetTransition();
    setTimeout(() => {
      enableTransition();
    }, 50);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = ({ scroll }) => setScrollY(scroll);
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, []);

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
          <ContentWrapper
            $mode={mode}
            $headerHeight={headerHeight}
            $foldState={foldState}
          >
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
