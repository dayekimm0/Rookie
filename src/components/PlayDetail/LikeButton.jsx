import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as farThumbsUp,
  faThumbsDown as farThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as fasThumbsUp,
  faThumbsDown as fasThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import authStore from "../../stores/AuthStore";

const PlayLike = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gray3);
  padding: 12px 20px;
  border-radius: 50px;
  gap: 16px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${({ $active }) => ($active ? "var(--main)" : "white")};
  font-size: 2rem;
  cursor: pointer;
  span {
    font-size: 1.6rem;
    text-align: center;
    width: 20px;
  }
  svg {
    transition: all 0.3s ease;
    color: ${({ $active }) => ($active ? "var(--main)" : "white")};
  }
`;

const LikeButton = ({ videoId }) => {
  const [selected, setSelected] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const { user, likes, addLike, removeLike } = authStore();

  useEffect(() => {
    const fetchLikeCount = async () => {
      const snap = await getDoc(doc(db, "videos", videoId));
      if (snap.exists()) {
        setLikeCount(snap.data().likeCount || 0);
      }
    };
    fetchLikeCount();
  }, [videoId]);

  useEffect(() => {
    if (likes.includes(videoId)) setSelected("like");
  }, [likes, videoId]);

  const handleLike = async () => {
    if (!user) return alert("로그인이 필요합니다.");
    const userLikesRef = doc(db, "userLikes", user.uid);
    const videoRef = doc(db, "videos", videoId);
    const isLiked = selected === "like";

    try {
      if (isLiked) {
        removeLike(videoId);
        setSelected("");
        setLikeCount((prev) => Math.max(0, prev - 1));
        await setDoc(userLikesRef, {
          likes: likes.filter((id) => id !== videoId),
        });
        await updateDoc(videoRef, { likeCount: increment(-1) });
      } else {
        addLike(videoId);
        setSelected("like");
        setLikeCount((prev) => prev + 1);
        await setDoc(userLikesRef, { likes: [...likes, videoId] });
        await updateDoc(videoRef, { likeCount: increment(1) });
      }
    } catch (e) {
      console.error("❌ 좋아요 처리 오류:", e.message);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("로그인이 필요합니다.");
    const isDisliked = selected === "dislike";
    const isLiked = selected === "like";
    const userLikesRef = doc(db, "userLikes", user.uid);
    const videoRef = doc(db, "videos", videoId);

    try {
      if (isDisliked) {
        setSelected("");
      } else {
        setSelected("dislike");
        if (isLiked) {
          removeLike(videoId);
          setLikeCount((prev) => Math.max(0, prev - 1));
          await setDoc(userLikesRef, {
            likes: likes.filter((id) => id !== videoId),
          });
          await updateDoc(videoRef, { likeCount: increment(-1) });
        }
      }
    } catch (e) {
      console.error("❌ 싫어요 처리 오류:", e.message);
    }
  };

  return (
    <PlayLike>
      <StyledLabel onClick={handleLike} $active={selected === "like"}>
        <FontAwesomeIcon
          icon={selected === "like" ? fasThumbsUp : farThumbsUp}
        />
        <span>{likeCount}</span>
      </StyledLabel>
      <StyledLabel onClick={handleDislike} $active={selected === "dislike"}>
        <FontAwesomeIcon
          icon={selected === "dislike" ? fasThumbsDown : farThumbsDown}
        />
      </StyledLabel>
    </PlayLike>
  );
};

export default LikeButton;
