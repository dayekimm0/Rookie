import styled from "styled-components";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as farThumbsUp,
  faThumbsDown as farThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as fasThumbsUp,
  faThumbsDown as fasThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import authStore from "../../stores/authStore";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-right: 30px;
`;

const PlayThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  div {
    width: 100% !important;
    height: 100% !important;
  }
  iframe {
    width: 100% !important;
    height: 100% !important;
  }
`;

const PlayTitle = styled.h1`
  font-size: 2.4rem;
  color: var(--light);
  font-weight: 600;
`;

const PlayInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlayInfo = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const TeamLogo = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const TeamInfo = styled.div`
  width: 100%;
`;

const TeamName = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: var(--light);
  margin-bottom: 6px;
`;

const TeamSubscribe = styled.h3`
  font-size: 1.4rem;
  color: var(--grayC);
`;

const PlayLike = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gray3);
  padding: 12px 20px;
  border-radius: 50px;
  gap: 16px;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
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

const MainPlay = ({
  videoId,
  title,
  channelTitle,
  subscriberCount,
  teamLogo,
}) => {
  const [selected, setSelected] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const { user, likes, addLike, removeLike } = authStore();

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      cc_load_policy: 0,
    },
  };

  // 좋아요 수 가져오기
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const snap = await getDoc(doc(db, "videos", videoId));
        if (snap.exists()) {
          setLikeCount(snap.data().likeCount || 0);
        }
      } catch (err) {
        console.error("🔥 좋아요 수 로딩 실패:", err.message);
      }
    };
    fetchLikeCount();
  }, [videoId]);

  // 2️⃣ 상태 복원: 로그인된 유저가 이전에 좋아요한 영상인지
  useEffect(() => {
    if (likes.includes(videoId)) {
      setSelected("like");
    }
  }, [likes, videoId]);

  // 3️⃣ 좋아요 버튼 처리
  const handleLike = async () => {
    if (!user) return alert("로그인이 필요합니다");

    const userLikesRef = doc(db, "userLikes", user.uid);
    const videoRef = doc(db, "videos", videoId);
    const snap = await getDoc(videoRef);
    const exists = snap.exists();

    const isLiked = selected === "like";
    const isDisliked = selected === "dislike";

    try {
      if (isLiked) {
        // 좋아요 해제
        removeLike(videoId);
        setSelected("");
        setLikeCount((prev) => Math.max(0, prev - 1));

        await setDoc(userLikesRef, {
          likes: likes.filter((id) => id !== videoId),
        });
        if (exists) await updateDoc(videoRef, { likeCount: increment(-1) });
      } else {
        // 싫어요 상태면 해제
        if (isDisliked) {
          // 아무 카운트 변화 없음
        }

        // 좋아요 추가
        addLike(videoId);
        setSelected("like");
        setLikeCount((prev) => prev + 1);

        await setDoc(userLikesRef, {
          likes: [...likes, videoId],
        });

        if (exists) {
          await updateDoc(videoRef, { likeCount: increment(1) });
        } else {
          await setDoc(videoRef, { likeCount: 1 });
        }
      }
    } catch (error) {
      console.error("❌ 좋아요 처리 오류:", error.message);
    }
  };

  // 4️⃣ 싫어요 처리 (카운트 없음, 상태만)
  const handleDislike = async () => {
    if (!user) return alert("로그인이 필요합니다");

    const isDisliked = selected === "dislike";
    const isLiked = selected === "like";

    const userLikesRef = doc(db, "userLikes", user.uid);
    const videoRef = doc(db, "videos", videoId);

    try {
      if (isDisliked) {
        setSelected("");
      } else {
        setSelected("dislike");

        // 좋아요 상태였다면 제거
        if (isLiked) {
          removeLike(videoId);
          setLikeCount((prev) => Math.max(0, prev - 1));
          await setDoc(userLikesRef, {
            likes: likes.filter((id) => id !== videoId),
          });

          const snap = await getDoc(videoRef);
          if (snap.exists()) {
            await updateDoc(videoRef, { likeCount: increment(-1) });
          }
        }
      }
    } catch (err) {
      console.error("❌ 싫어요 처리 오류:", err.message);
    }
  };

  return (
    <Container>
      <PlayThumbnail>
        <YouTube videoId={videoId} opts={opts} />
      </PlayThumbnail>
      <PlayTitle>{title}</PlayTitle>
      <PlayInfoWrapper>
        <PlayInfo>
          <TeamLogo>
            <img src={teamLogo} alt="채널 썸네일" />
          </TeamLogo>
          <TeamInfo>
            <TeamName>{channelTitle}</TeamName>
            <TeamSubscribe>마이팬 {subscriberCount}</TeamSubscribe>
          </TeamInfo>
        </PlayInfo>
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
      </PlayInfoWrapper>
    </Container>
  );
};

export default MainPlay;
