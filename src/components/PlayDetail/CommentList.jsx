import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const CommentListWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin: 8px 0;
  border-top: 1px solid var(--gray6);
  border-bottom: 1px solid var(--gray6);
  padding-top: 14px;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--grayC);
    border-radius: 4px;
    cursor: pointer;
  }
`;

const CommentList = ({ videoId, onCountChange }) => {
  const scrollRef = useRef(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!videoId) return;

    const q = query(
      collection(db, "comments"),
      where("videoId", "==", videoId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sorted = data.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      });

      setComments(sorted);
      onCountChange?.(sorted.length);
    });

    return () => unsubscribe();
  }, [videoId, onCountChange]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }

      e.stopPropagation(); // 🛑 레니스 막기
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <CommentListWrapper ref={scrollRef}>
      <Comments comments={comments} />
    </CommentListWrapper>
  );
};

export default CommentList;
