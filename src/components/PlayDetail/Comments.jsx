import styled from "styled-components";

const CommentWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

const UserImg = styled.div`
  width: 42px;
  height: 42px;
  background: var(--grayF5);
  border-radius: 50%;
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

const Comment = styled.div``;

const Comments = () => {
  return (
    <CommentWrapper>
      <UserImg>
        <img src="" alt="" />
      </UserImg>
      <CommentItem>
        <UserInfo>
          <UserName>
            dayekoongya
            <p>2시간 전</p>
          </UserName>
        </UserInfo>
        <Comment>
          이긴것도 좋지만 이젠 두산의 미래를 이끌어나갈 젊은 야수들의 활약이 더
          반갑다
        </Comment>
      </CommentItem>
    </CommentWrapper>
  );
};

export default Comments;
