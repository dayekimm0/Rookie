import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import lenis from "./lenisInstance";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
