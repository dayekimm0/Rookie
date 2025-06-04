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
  const { user, userProfile } = authStore();
  const addComment = authStore((state) => state.addComment);
  const userName = userProfile?.nickname || "사용자";

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const isDisabled = value.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const newComment = {
      id: Date.now(), // 간단한 고유 id
      text: value,
      author: userName,
      userProfileImage: userProfile?.profileImage || "",
      createdAt: new Date().toISOString(),
      userId: user?.uid,
    };

    try {
      addComment(newComment);
      setValue("");
      console.log("✅ 댓글이 authStore에 저장됨:", newComment);
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
        placeholder="댓글 추가하기"
        value={value}
        onChange={handleChange}
        required
      />
      <SubmitBtn type="submit" value="댓글" disabled={isDisabled} />
    </PostComment>
  );
};

export default PostCommentPart;
