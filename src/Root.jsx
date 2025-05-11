import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import { auth } from "./firebase";

const ContentWrapper = styled.div`
  position: relative;
  top: 180px;
  height: calc(100vh - 180px);
`;

function Root() {
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const location = useLocation();
  const hideHeaderPath = ["/login", "/logon"];
  // const [isLoading, setIsLoading] = useState(true);

  // const init = async()=>{
  //   await auth.authStateReady();
  //   setIsLoading(false);
  // }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      console.log(currentScroll);

      if (currentScroll > prevScroll) {
        setIsHeaderActive(true); // 아래로 스크롤 시 active
      } else if (currentScroll === 0) {
        setIsHeaderActive(false); // 맨 위면 숨김
      } else {
        setIsHeaderActive(false); // 위로 스크롤하면 숨겨짐
      }

      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  // useEffect (()=>{
  //   init();
  // },[]);

  // lenis 적용
  useEffect(() => {
    const lenis = new Lenis({
      // duration: 1.2,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
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
      {hideHeaderPath.includes(location.pathname) &&  <Outlet />}
    </>
  );
}

export default Root;
