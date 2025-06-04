import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import Comments from "./Comments";

const CommentListWrapper = styled.div`
  width: 100%;
  height: 78%;
  margin-bottom: 8px;
  overflow-y: auto; // 스크롤 가능
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

  return (
    <CommentListWrapper>
      <Comments />
    </CommentListWrapper>
  );
};

export default CommentList;
