import styled from "styled-components";

const CommentWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const UserImg = styled.div`
  width: 42px;
  height: 42px;
  background: var(--grayF5);
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 8px;
`;

const UserInfo = styled.div`
  display: flex;
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
`;

const Comment = styled.div`
  color: var(--light);
  font-size: 1.4rem;
`;

const Comments = ({ comments }) => {
  const timeAgo = (raw) => {
    const date = raw?.toDate?.() || raw;
    if (!(date instanceof Date)) return "방금 전";

    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return `${Math.floor(diff)}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
    return `${Math.floor(diff / 604800)}주 전`;
  };

  return (
    <>
      {comments.length === 0 && <p>댓글이 없습니다.</p>}
      {comments.map((comment) => (
        <CommentWrapper key={comment.id}>
          <UserImg>
            {comment.userProfileImage && (
              <img src={comment.userProfileImage} alt="profile" />
            )}
          </UserImg>
          <CommentItem>
            <UserInfo>
              <UserName>
                {comment.author || "user"} <p>{timeAgo(comment.createdAt)}</p>
              </UserName>
            </UserInfo>
            <Comment>{comment.text}</Comment>
          </CommentItem>
        </CommentWrapper>
      ))}
    </>
  );
};

export default Comments;
