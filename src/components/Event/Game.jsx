import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Modal from "react-modal";

import authStore from "../../stores/AuthStore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import TextBox from "../../images/coupon/text_box.png";
import BallImg from "../../images/coupon/baseball.png";
import ButtonGroup from "./ButtonGroup";

import gamecoupon1 from "../../images/coupon/gamecoupon1.png";
import gamecoupon2 from "../../images/coupon/gamecoupon2.png";
import gamecoupon3 from "../../images/coupon/gamecoupon3.png";
import gamecoupon4 from "../../images/coupon/gamecoupon4.png";

import cp1 from "../../images/coupon/cp1.png";
import cp2 from "../../images/coupon/cp2.png";
import cp3 from "../../images/coupon/cp3.png";
import cp4 from "../../images/coupon/cp4.png";
import boom from "../../images/coupon/boom.png";

const Container = styled.div`
  font-family: "Pretendard";
`;

const GameBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0fr);
  grid-template-rows: repeat(3, 0fr);
  justify-content: center;
  align-content: center;
  gap: 8px;
  padding: 22px 0px 81px 0px;

  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 376px) {
    padding: 22px 0px 60px 0px;
  }
`;

const ScaleUp = keyframes`
  from {transform: scale(0.5); opacity: 0;}
  to { transform: scale(1); opacity: 1; }
`;

const FlipIn = keyframes`
  from {
    transform: perspective(600px) rotateY(180deg);
    opacity: 0;
  }
  to {
    transform: perspective(600px) rotateY(0);
    opacity: 1;
  }
`;

const CouponModalContent = styled.div`
  animation: ${ScaleUp} 0.5s ease-out;
  background-color: var(--dark);
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  height: 100%;
  width: 100%;
  margin: auto;
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2);
  color: var(--light);
  position: relative;
`;

const CouponTitle = styled.h2`
  font-family: "GmarketSans";
  font-size: 4.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  user-select: none;
`;

const CouponDesc = styled.p`
  font-size: 1.2rem;
  margin-bottom: 24px;
  user-select: none;
`;

const CouponImage = styled.img`
  max-width: 260px;
  width: 100%;
  height: auto;
  margin-bottom: 24px;
  user-select: none;
`;

const MyPageButton = styled.button`
  background-color: var(--main);
  color: var(--dark);
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 1.4rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
  margin-bottom: 8px;

  &:hover {
    opacity: 0.9;
    background: var(--light);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  color: var(--light);
  cursor: pointer;
`;

const GameBoxBackground = styled.div`
  width: 130px;
  height: 130px;
  background: var(--light);
  border-radius: 7px;
  justify-content: center;
  align-content: center;
  padding: 5px;
  transition: all 0.5s;
  &.animated {
    animation: ${FlipIn} 0.4s ease-out forwards;
  }
  &.coupon-animated {
    animation: ${FlipIn} 0.4s ease-out forwards;
  }

  &:hover {
    background: var(--main);
    user-select: none;
  }

  @media screen and (max-width: 376px) {
    width: 90px;
    height: 90px;
  }
`;

const GameBoxContent = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 14px;
  background: var(--gray8);
  border-radius: 8px;
`;

const TextBoxImg = styled.img`
  @media screen and (max-width: 500px) {
    width: 75%;
  }
`;

/* ==================== 게임 로직 START ==================== */

const coupons = [
  {
    type: "coupon",
    img: gamecoupon1,
    modalImg: cp1,
    title: "HOME RUN !",
    desc: "마이페이지에서 확인하실 수 있습니다.",
    weight: 15,
  },
  {
    type: "coupon",
    img: gamecoupon2,
    modalImg: cp2,
    title: "TRIPLE !",
    desc: "마이페이지에서 확인하실 수 있습니다.",
    weight: 30,
  },
  {
    type: "coupon",
    img: gamecoupon3,
    modalImg: cp3,
    title: "DOUBLE !",
    desc: "마이페이지에서 확인하실 수 있습니다.",
    weight: 60,
  },
  {
    type: "coupon",
    img: gamecoupon4,
    modalImg: cp4,
    title: "SINGLE !",
    desc: "마이페이지에서 확인하실 수 있습니다.",
    weight: 85,
  },
];

// 꽝 이미지
const fails = [{ type: "fail", img: boom }];

/* 가중치 기반 랜덤 쿠폰 추첨함수 */
// 랜덤하게 하나의 쿠폰을 반환하지만, 각 쿠폰의 weight(가중치)에 따라 확률이 다르게 설정된 함수
const getRandomCoupon = () => {
  // 모든 쿠폰의 가중치를 합산해서 전체 가중치 값을 계산
  // 전체 가중치 합산
  const total = coupons.reduce((sum, item) => sum + item.weight, 0); // coupons weight value : 15 + 30 + 60 + 85 = 190

  // 0 이상 total 미만의 실수 중 무작위 수를 생성
  // rand 수는 당첨되는지를 결정하는 역할
  const rand = Math.random() * total;

  // 누적 가중치 초기값
  let cumulative = 0;

  // 쿠폰 배열의 갯수만큼 증가하다가 누적 가중치가 rand보다 커지는 순간 쿠폰을 선택
  for (let i = 0; i < coupons.length; i++) {
    cumulative += coupons[i].weight;

    // rand가 현재까지의 누적 weight보다 작다면, 해당 쿠폰이 당첨됨
    if (rand < cumulative) return coupons[i]; // 당첨된 쿠폰 반환
  }
  // 마지막 쿠폰을 기본값으로 반환
  return coupons[coupons.length - 1];
};

/* 게임판 3 x 3 */
const generateBoardData = () => {
  const board = Array(9).fill(null);
  const winIndex = Math.floor(Math.random() * 9);
  board[winIndex] = getRandomCoupon();

  for (let i = 0; i < board.length; i++) {
    if (i !== winIndex) {
      board[i] = fails[Math.floor(Math.random() * fails.length)];
    }
  }

  return board;
};

const Game = () => {
  const [revealed, setRevealed] = useState(Array(9).fill(false));
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePlayedFlag, setGamePlayedFlag] = useState(false);

  const navigate = useNavigate();

  const user = authStore((state) => state.user);
  const isLoading = authStore((state) => state.isLoading);
  const gamePlayed = authStore((state) => state.gamePlayed);
  const setGamePlayed = authStore((state) => state.setGamePlayed);

  useEffect(() => {
    const fetchGameStatus = async () => {
      if (user?.uid) {
        const docRef = doc(db, "gameUser", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const played = docSnap.data().gamePlayed;
          console.log("Firebase에서 가져온 gamePlayed:", played);

          setGamePlayedFlag(played);
          setGamePlayed(played);
        } else {
          console.log("사용자 게임 데이터 없음");
        }
      }
    };

    if (user?.uid) {
      console.log("유저 로그인됨:", user.uid);
      fetchGameStatus();
    } else {
      console.log("유저 없음: 로그인 필요");
    }
  }, [user?.uid]);

  // Always initialize the game board
  useEffect(() => {
    if (!result) {
      console.log("게임 시작: result 데이터 생성");
      const board = generateBoardData();
      setResult(board);
      console.log("생성된 result:", board);
    }
  }, [result]);

  // 비회원 이벤트 참여 막기
  const handleClick = async (index) => {
    if (!user) {
      alert("로그인 후 이용가능합니다!");
      return;
    }

    // 사용자 파이어스토어 저장값 불러와서 조건부랜더링 후 막기
    if (revealed[index] || gameStarted || gamePlayed || gamePlayedFlag) {
      alert("이벤트 게임은 한 번만 참여 가능합니다.\n이미 참여하셨습니다!");
      return;
    }

    setGameStarted(true);

    // 서버에서 다시 확인 (게임을 진행 한 계정인지 아닌지)
    try {
      const latest = await getDoc(doc(db, "gameUser", user.uid));
      if (latest.exists() && latest.data().gamePlayed) {
        setGamePlayed(true);
        setGamePlayedFlag(true);
        alert("이미 게임을 진행하셨습니다.");
        return;
      }

      const next = [...revealed];
      next[index] = true;
      setRevealed(next);

      const item = result[index];

      // 게임 결과값 Firestore 값 저장 (gamePlayed: true)
      const gameUserRef = doc(db, "gameUser", user.uid);
      await setDoc(gameUserRef, { gamePlayed: true }, { merge: true });
      setGamePlayed(true);
      setGamePlayedFlag(true);
      console.log("Firebase 저장 성공");

      if (item.type === "coupon") {
        setModalContent(item);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("게임 처리 중 오류 발생:", error);
      alert("게임 참여 중 오류가 발생했습니다. 다시 시도해주세요.");
      setGameStarted(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 로딩 중이면 UI 보여주지 않음
  if (isLoading) {
    return null;
  }

  return (
    <Container>
      <TextBoxImg src={TextBox} />
      {result ? (
        <GameBox>
          {result.map((item, index) => (
            <GameBoxBackground
              key={index}
              onClick={() => handleClick(index)}
              className={revealed[index] ? "coupon-animated" : ""}
              style={{
                cursor: gamePlayed || gamePlayedFlag ? "default" : "pointer", // Keep cursor change for UX
              }}
            >
              {revealed[index] ? (
                <img
                  src={item.img}
                  alt={item.type}
                  width="100%"
                  height="100%"
                />
              ) : (
                <GameBoxContent src={BallImg} alt="baseball" />
              )}
            </GameBoxBackground>
          ))}
        </GameBox>
      ) : null}
      <ButtonGroup />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={true}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
            padding: "0",
            height: "340px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          },
        }}
      >
        <CouponModalContent>
          <CloseButton onClick={closeModal}>✕</CloseButton>
          <CouponTitle>{modalContent?.title}</CouponTitle>
          <CouponDesc>{modalContent?.desc}</CouponDesc>
          <CouponImage src={modalContent?.modalImg} alt={modalContent?.type} />
          <MyPageButton onClick={() => navigate("/mypage")}>
            마이페이지로 이동
          </MyPageButton>
        </CouponModalContent>
      </Modal>
    </Container>
  );
};

export default Game;
