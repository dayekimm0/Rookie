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
  overflow-x: hidden;
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
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    width: inherit;
    height: 300px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 300px;

    p {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    &::-webkit-scrollbar {
      width: 4px;
      cursor: pointer;
    }
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

    // Firestore 실시간 구독 시작
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();

          // createdAt 안전처리
          const createdAtDate = docData.createdAt?.toDate
            ? docData.createdAt.toDate()
            : new Date(0);

          return {
            id: doc.id,
            ...docData,
            createdAt: createdAtDate,
          };
        });

        // 최신순 정렬 (내림차순)
        const sorted = data.sort((a, b) => b.createdAt - a.createdAt);

        setComments(sorted);
        onCountChange?.(sorted.length);
      },
      (error) => {
        console.error("댓글 데이터 로드 실패:", error);
      }
    );

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

      e.stopPropagation();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const handleDeleteLocal = (deletedId) => {
    setComments((prev) => prev.filter((c) => c.id !== deletedId));
  };

  return (
    <CommentListWrapper ref={scrollRef}>
      <Comments comments={comments} onDeleteLocal={handleDeleteLocal} />
    </CommentListWrapper>
  );
};

export default CommentList;
