import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import lenis from "./lenisInstance";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ScrollToTop from "./ScrollToTop";
import useHeaderStore from "./stores/headerStore";

const ContentWrapper = styled.div`
  position: relative;
  padding-top: ${({ $isHeaderActive }) =>
    $isHeaderActive ? "150px" : "180px"};
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
  const location = useLocation();

  const hideHeaderPath = ["/login", "/logon"];
  const isVisible = !hideHeaderPath.includes(location.pathname);

  const mode = getMode(location.pathname);

  useEffect(() => {
    unfold(); // 페이지 이동 시 항상 펼침
  }, [location.pathname]);

  useEffect(() => {
    const scrollEl = document.querySelector("#lenis-root");
    lenis.on("scroll", (e) => {
      foldIfScrolled(e.scroll);
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.stop();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <ScrollToTop />
      {isVisible && (
        <>
          <Header />
          <div id="lenis-root">
            <ScrollToTop />
            <ContentWrapper $mode={mode}>
              <Outlet />
            </ContentWrapper>
          </div>
          {/* <ContentWrapper $mode={mode}>
            <Outlet />
          </ContentWrapper> */}
          <Footer mode={mode} />
        </>
      )}
      {!isVisible && <Outlet />}
    </>
  );
}
export default Root;
