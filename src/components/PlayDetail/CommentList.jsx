import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Comments from "./Comments";

const CommentListWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin-bottom: 8px;
  margin-top: 8px;
  border-top: 1px solid var(--gray6);
  border-bottom: 1px solid var(--gray6);
  padding-top: 14px;
  overflow-y: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--grayC);
    border-radius: 4px;
  }
`;

const CommentList = () => {
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const newComments = [];
  //     querySnapshot.forEach((doc) => {
  //       newComments.push({ id: doc.id, ...doc.data() });
  //     });
  //     setComments(newComments);
  //   });

  //   return () => unsubscribe();
  // }, []);
  const scrollRef = useRef(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const THRESHOLD = 500;

    const checkHeight = () => {
      if (el.scrollHeight > THRESHOLD && !isScrollLocked) {
        lenis.stop();
        setIsScrollLocked(true);
      } else if (el.scrollHeight <= THRESHOLD && isScrollLocked) {
        lenis.start();
        setIsScrollLocked(false);
      }
    };

    checkHeight();

    const onWheel = (e) => {
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollHeight - el.clientHeight === el.scrollTop;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        lenis.start();
      } else {
        lenis.stop();
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      lenis.start();
    };
  }, [isScrollLocked]);

  return (
    <CommentListWrapper ref={scrollRef}>
      <Comments />
    </CommentListWrapper>
  );
};

export default CommentList;
