import styled from "styled-components";
import { useState } from "react";
import authStore from "../../stores/AuthStore";

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
  overflow: hidden;
  transition: all 0.3s;
  &:focus {
    outline: none;
    color: var(--light);
  }
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
    font-family: "Figtree", "Pretendard", sans-serif;
  }
`;

const SubmitBtn = styled.input`
  width: 70px;
  height: 70%;
  border-radius: 60px;
  border: none;
  background: ${({ disabled }) => (disabled ? "var(--grayD)" : "var(--main)")};
  font-weight: ${({ disabled }) => (disabled ? "400" : "500")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const PostCommentPart = () => {
  const [value, setValue] = useState("");
  const { user, userProfile } = authStore();
  const addComment = authStore((state) => state.addComment);
  const userName = userProfile?.nickname || "사용자";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // ✅ textarea에 엔터 입력 자체를 방지
      if (!isDisabled) {
        handleSubmit(); // 댓글 제출
      }
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const isDisabled = value.trim() === "";

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isDisabled) return;

    const cleanValue = value.trim();

    const newComment = {
      id: Date.now(),
      text: cleanValue,
      author: userName,
      userProfileImage: userProfile?.profileImage || "",
      createdAt: new Date().toISOString(),
      userId: user?.uid,
    };

    try {
      addComment(newComment);
      setValue(""); // ✅ 입력값 초기화
    } catch (error) {
      console.error("❌ 댓글 저장 실패:", error);
    }
  };

  return (
    <PostComment onSubmit={handleSubmit}>
      <UserInfo>
        <UserTeam>
          {userProfile?.profileImage ? (
            <img src={userProfile.profileImage} alt="profile" />
          ) : null}
        </UserTeam>
        <UserName>{userName}</UserName>
      </UserInfo>
      <TextArea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="댓글 추가하기"
      />
      <SubmitBtn type="submit" value="댓글" disabled={isDisabled} />
    </PostComment>
  );
};

export default PostCommentPart;
