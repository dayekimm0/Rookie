import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import lenis from "./lenisInstance";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    lenis.scrollTo(0, { immediate: true });
  }, []);

  return null;
};

export default ScrollToTop;
