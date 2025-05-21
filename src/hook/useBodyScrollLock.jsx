import { useEffect } from "react";
import { getScrollbarWidth } from "../util";

const useBodyScrollLock = (isActive) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isActive) {
      const scrollBarWidth = getScrollbarWidth();
      html.classList.add("modal-open");
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      html.classList.remove("modal-open");
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    return () => {
      html.classList.remove("modal-open");
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isActive]);

  useEffect(() => {
    const lenis = window.lenis;

    if (isActive) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isActive]);
};

export default useBodyScrollLock;
