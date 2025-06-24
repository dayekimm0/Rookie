import styled from "styled-components";
import { useState } from "react";
import authStore from "../../stores/AuthStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { getEmblem } from "../../util";

const PostComment = styled.form`
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    height: 40px;
  }
  @media screen and (max-width: 768px) {
    height: 40px;
  }

  @media screen and (max-width: 500px) {
  }
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
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media screen and (max-width: 500px) {
  }
`;

const UserName = styled.p`
  min-width: 80px;
  color: var(--light);
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    min-width: 50px;
  }
  @media screen and (max-width: 768px) {
    min-width: 50px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 500px) {
  }
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

const PostCommentPart = ({ videoId }) => {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, userProfile } = authStore();
  const userName = userProfile?.nickname || "사용자";
  const favoriteTeam = userProfile?.favoriteTeam || "";
  const isDisabled = value.trim() === "" || isSubmitting;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("로그인이 필요합니다.");
    if (isDisabled) return;

    setIsSubmitting(true);
    const newComment = {
      text: value.trim(),
      author: userName,
      userId: user.uid,
      userProfileImage: userProfile?.profileImage || "",
      favoriteTeam,
      videoId,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "comments"), newComment);
      setValue("");
    } catch (err) {
      console.error("댓글 저장 실패:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostComment onSubmit={handleSubmit}>
      <UserInfo>
        <UserTeam>
          {favoriteTeam && (
            <img
              src={getEmblem(teamToEmblemId[favoriteTeam] || "1")}
              alt="teamEmblem"
            />
          )}
        </UserTeam>
        <UserName>{userName}</UserName>
      </UserInfo>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.target.form?.requestSubmit();
          }
        }}
        placeholder="댓글 추가하기"
      />
      <SubmitBtn type="submit" value="댓글" disabled={isDisabled} />
    </PostComment>
  );
};

export default PostCommentPart;
