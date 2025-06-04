import styled from "styled-components";
import { useState } from "react";
import authStore from "../../stores/AuthStore";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PostComment = styled.form`
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const UserTeam = styled.div`
  width: 40px;
  height: 40px;
  background: var(--grayF5);
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.p`
  min-width: 80px;
  color: var(--light);
`;

const TextArea = styled.textarea`
  width: 100%;
  max-height: 24px;
  resize: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  transition: all 0.3s;
  &:focus {
    outline: none;
    color: var(--light);
  }
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
`;

const SubmitBtn = styled.input`
  width: 70px;
  height: 70%;
  border-radius: 60px;
  background: var(--grayD);
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const PostCommentPart = () => {
  const [value, setValue] = useState("");
  const { user, userProfile, isLoading } = authStore();
  const userName = userProfile?.nickname || "사용자";

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const isDisabled = value.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() === "") return;

    const newComment = {
      text: value,
      author: userName,
      createdAt: serverTimestamp(),
      userId: user?.uid, // 유저의 UID 등 필요한 정보
    };

    try {
      // Firestore에 댓글 추가
      await addDoc(collection(db, "comments"), newComment);

      // 로컬 상태에도 추가 (즉시 UI에 반영)
      addComment({
        ...newComment,
        createdAt: new Date(), // 로컬에서 즉시 보이도록 Date로 넣어줌
        id: Date.now(), // 로컬에서 map할 때 key로 사용
      });

      // 입력창 초기화
      setValue("");
    } catch (error) {
      console.error("댓글 업로드 실패:", error);
    }
  };

  return (
    <PostComment onSubmit={handleSubmit}>
      <UserInfo>
        <UserTeam>
          <img src="" alt="" />
        </UserTeam>
        <UserName>{userName}</UserName>
      </UserInfo>
      <TextArea
        placeholder="댓글 추가하기"
        value={value}
        onChange={handleChange}
        required
      />
      <SubmitBtn type="submit" value="댓글" disabled={isDisabled}></SubmitBtn>
    </PostComment>
  );
};

export default PostCommentPart;
