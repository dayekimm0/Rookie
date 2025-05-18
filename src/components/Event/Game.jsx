import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Modal from "react-modal";

import TextBox from "../../images/coupon/text_box.png";
import BallImg from "../../images/coupon/baseball.png";
import ButtonGroup from "./ButtonGroup";

/* 당첨 쿠폰 이미지 */
import gamecoupon1 from "../../images/coupon/gamecoupon1.png";
import gamecoupon2 from "../../images/coupon/gamecoupon2.png";
import gamecoupon3 from "../../images/coupon/gamecoupon3.png";
import gamecoupon4 from "../../images/coupon/gamecoupon4.png";

/* 모달화면에 사용될 쿠폰 이미지 */
import cp1 from "../../images/coupon/cp1.png";
import cp2 from "../../images/coupon/cp2.png";
import cp3 from "../../images/coupon/cp3.png";
import cp4 from "../../images/coupon/cp4.png";

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
  @media screen and (max-width: 375px) {
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

// 모달 관련 스타일
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
  font-family: "GmarketSans", sans-serif;
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
  /* 임시 */
  &:hover {
    background: var(--main);
    user-select: none;
  }
  /* 임시 */
  @media screen and (max-width: 1024px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (max-width: 500px) {
    width: 115px;
    height: 115px;
  }
  @media screen and (max-width: 375px) {
    width: 95px;
    height: 95px;
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
  @media screen and (max-width: 375px) {
    width: 80%;
  }
`;

/* 당첨 쿠폰 이미지 배열 */
const coupons = [
  {
    type: "coupon",
    img: gamecoupon1, // 게임판에서 보여줄 이미지
    modalImg: cp1, // 모달에서 보여줄 이미지
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

const fails = [
  { type: "fail", label: "꽝" },
  { type: "fail", label: "다음 기회에.." },
];

// 랜덤 쿠폰 함수
const getRandomCoupon = () => {
  const total = coupons.reduce((sum, item) => sum + item.weight, 0);
  const rand = Math.random() * total;
  let cumulative = 0;
  for (let i = 0; i < coupons.length; i++) {
    cumulative += coupons[i].weight;
    if (rand < cumulative) return coupons[i];
  }
  return coupons[coupons.length - 1];
};

// 초기 게임칸 세팅
const generateBoardData = () => {
  const board = Array(9).fill(null);
  const winIndex = Math.floor(Math.random() * 9);
  board[winIndex] = getRandomCoupon();

  // 나머지 8칸 랜덤 실패 메세지로 채우기
  for (let i = 0; i < board.length; i++) {
    if (i !== winIndex) {
      board[i] = fails[Math.floor(Math.random() * fails.length)];
    }
  }

  return board;
};
const Game = () => {
  const [revealed, setRevealed] = useState(Array(9).fill(false));
  const [result] = useState(generateBoardData); // 초기값만 쓰고 변경 X
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 방지
    } else {
      document.body.style.overflow = "auto"; // 스크롤 복원
    }
    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트 언마운트 될 때 복원
    };
  }, [isModalOpen]);

  const handleClick = (index) => {
    if (revealed[index]) return;

    const next = [...revealed];
    next[index] = true;
    setRevealed(next);

    const item = result[index];
    if (item.type === "coupon") {
      setModalContent(item);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <TextBoxImg src={TextBox} />
        <GameBox>
          {result.map((item, index) => (
            <GameBoxBackground
              key={index}
              onClick={() => handleClick(index)} // 클릭 시 handleClick에 index 전달
              className={
                revealed[index]
                  ? item.type === "coupon"
                    ? "coupon-animated"
                    : "animated"
                  : ""
              }
            >
              {revealed[index] ? (
                item.type === "coupon" ? (
                  <img src={item.img} alt="coupon" width="100%" height="100%" />
                ) : (
                  <span>{item.label}</span>
                )
              ) : (
                <GameBoxContent src={BallImg} alt="baseball" />
              )}
            </GameBoxBackground>
          ))}
        </GameBox>
        <ButtonGroup />
      </Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
            padding: "0",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <CouponModalContent>
          <CloseButton onClick={closeModal}>✕</CloseButton>
          <CouponTitle>{modalContent?.title}</CouponTitle>
          <CouponDesc>{modalContent?.desc}</CouponDesc>
          <CouponImage src={modalContent?.modalImg} alt="coupon" />
          <MyPageButton
            onClick={() => {
              closeModal();
              navigate("/mypage");
            }}
          >
            마이페이지로 이동
            <i className="fas fa-angle-right"></i>
          </MyPageButton>
        </CouponModalContent>
      </Modal>
    </>
  );
};

export default Game;
