import { useEffect, useRef } from "react";

export default function useDragScroll(ref) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      el.classList.add("dragging");
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.classList.remove("dragging");
    };

    const onTouchStart = (e) => {
      isDragging.current = true;
      el.classList.add("dragging");
      startX.current = e.touches[0].pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const onTouchEnd = () => {
      isDragging.current = false;
      el.classList.remove("dragging");
    };

    // 마우스
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    // 모바일 터치
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref]);
}
