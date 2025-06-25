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
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
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
  @media screen and (max-width: 500px) {
    padding: 0;
    background: none;
    margin-top: 16px;
  }
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
    margin-left: 4px;
  }
  svg {
    transition: all 0.3s ease;
    color: ${({ $active }) => ($active ? "var(--main)" : "white")};
  }
`;

const LikeButton = ({ videoId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [selected, setSelected] = useState(""); // "like" or "dislike" or ""
  const { user, likes, addLike, removeLike } = authStore();

  useEffect(() => {
    const videoRef = doc(db, "videos", videoId);
    const unsubscribe = onSnapshot(videoRef, (snap) => {
      if (snap.exists()) {
        setLikeCount(snap.data().likeCount || 0);
      }
    });
    return () => unsubscribe();
  }, [videoId]);

  useEffect(() => {
    if (likes.includes(videoId)) {
      setSelected("like");
    } else if (selected === "like") {
      setSelected("");
    }
  }, [likes, videoId]);

  const handleLike = async () => {
    if (!user) return alert("로그인이 필요합니다.");

    const videoRef = doc(db, "videos", videoId);
    const userLikesRef = doc(db, "userLikes", user.uid);
    const isLiked = selected === "like";
    const isDisliked = selected === "dislike";

    try {
      const videoSnap = await getDoc(videoRef);
      if (!videoSnap.exists()) {
        await setDoc(videoRef, { likeCount: 0 });
      }

      if (isLiked) {
        // 좋아요 취소
        removeLike(videoId);
        setSelected("");
        await setDoc(userLikesRef, {
          likes: likes.filter((id) => id !== videoId),
        });
        await updateDoc(videoRef, { likeCount: increment(-1) });
      } else {
        // 싫어요 눌린 상태였다면 초기화
        if (isDisliked) {
          setSelected("");
        }

        // 좋아요 등록
        if (!likes.includes(videoId)) {
          addLike(videoId);
          setSelected("like");
          await setDoc(userLikesRef, { likes: [...likes, videoId] });
          await updateDoc(videoRef, { likeCount: increment(1) });
        }
      }
    } catch (e) {
      console.error("❌ 좋아요 처리 오류:", e.message);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("로그인이 필요합니다.");

    const isDisliked = selected === "dislike";
    const isLiked = selected === "like";
    const videoRef = doc(db, "videos", videoId);
    const userLikesRef = doc(db, "userLikes", user.uid);

    try {
      if (isDisliked) {
        setSelected("");
      } else {
        setSelected("dislike");

        if (isLiked) {
          // 좋아요 해제
          removeLike(videoId);
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
