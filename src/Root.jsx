import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import lenis from "./lenisInstance";
import { useEffect, useState } from "react";
import styled from "styled-components";
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
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  // const [prevScroll, setPrevScroll] = useState(0);
  const location = useLocation();
  const hideHeaderPath = ["/login", "/logon"];
  const isVisible = !hideHeaderPath.includes(location.pathname);

  const mode = getMode(location.pathname);

  useEffect(() => {
    let ticking = false;

    const handleScroll = ({ scroll }) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsHeaderActive(scroll > 50);
          ticking = false;
        });
        ticking = true;
      }
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
      {isVisible && (
        <>
          <Header isActive={isHeaderActive} />
          <ContentWrapper $isHeaderActive={isHeaderActive} $mode={mode}>
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
