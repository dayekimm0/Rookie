import styled from "styled-components";
import { getEmblem } from "../../util";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import authStore from "../../stores/AuthStore";

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 8px;
  margin-bottom: 24px;

  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const UserTeam = styled.div`
  width: 42px;
  height: 42px;
  min-width: 42px;
  max-height: 42px;
  background: var(--grayF5);
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
    min-width: 30px;
    max-height: 30px;
  }

  @media screen and (max-width: 500px) {
    width: 26px;
    height: 26px;
    min-width: 26px;
    max-height: 26px;
  }
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 8px;
  width: calc(100% - 50px);
  @media screen and (max-width: 768px) {
    width: calc(100% - 38px);
  }
  @media screen and (max-width: 500px) {
    width: 26px;
    width: calc(100% - 34px);
  }
  @media screen and (max-width: 500px) {
    width: calc(100% - 34px);
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--gray6);
    margin-left: 8px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

const DeleteComment = styled.button`
  border: none;
  background: none;
  color: var(--grayC);
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

const Comment = styled.div`
  color: var(--light);
  font-size: 1.4rem;
  word-break: keep-all;
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;
const Comments = ({ comments, onDeleteLocal }) => {
  const { user } = authStore();

  const timeAgo = (raw) => {
    const date = raw?.toDate?.() || raw;
    if (!(date instanceof Date)) return "방금 전";
    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 5) return "방금 전";
    if (diff < 60) return `${Math.floor(diff)}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
    return `${Math.floor(diff / 604800)}주 전`;
  };
  const teamToEmblemId = {
    "기아 타이거즈": "1",
    "삼성 라이온즈": "2",
    "LG 트윈스": "3",
    "두산 베어스": "4",
    "KT 위즈": "5",
    "SSG 랜더스": "6",
    "롯데 자이언츠": "7",
    "한화 이글스": "8",
    "NC 다이노스": "9",
    "키움 히어로즈": "10",
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "comments", commentId));
        onDeleteLocal && onDeleteLocal(commentId);
      } catch (err) {
        console.error("댓글 삭제 실패:", err.message);
      }
    }
  };

  return (
    <>
      {comments.length === 0 && <p>댓글이 없습니다.</p>}
      {comments.map((comment) => (
        <CommentWrapper key={comment.id}>
          <UserTeam>
            {comment.favoriteTeam && (
              <img
                src={getEmblem(teamToEmblemId[comment.favoriteTeam] || "1")}
                alt="teamEmblem"
              />
            )}
          </UserTeam>
          <CommentItem>
            <UserInfo>
              <UserName>
                {comment.author || "user"} <p>{timeAgo(comment.createdAt)}</p>
              </UserName>
              {user?.uid === comment.userId && (
                <DeleteComment onClick={() => handleDelete(comment.id)}>
                  삭제
                </DeleteComment>
              )}
            </UserInfo>
            <Comment>{comment.text}</Comment>
          </CommentItem>
        </CommentWrapper>
      ))}
    </>
  );
};

export default Comments;
