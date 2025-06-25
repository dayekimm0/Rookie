import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import backgroundBottom from "../images/coupon/back_bottom.png";
import backgroundTop from "../images/coupon/back_top.png";
import ContentsTitle from "../components/Event/ContentTitle";
import Game from "../components/Event/Game";
import { getMascort } from "../util_mascort";
import authStore from "../stores/AuthStore";

// 전체 컨테이너
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  text-align: center;
`;

// 공통 배경 스타일
const Background = styled.div`
  position: absolute;
  width: 110%;
  height: 110%;
  top: -5%;
  left: -6.5%;
  pointer-events: none;

  @media screen and (max-width: 1024px) {
    width: 110%;
    top: -5%;
    left: -6.5%;
  }

  @media screen and (max-width: 768px) {
    width: 110%;
    top: -5%;
    left: -6.5%;
  }
`;

// 배경 이미지 스타일
const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 상단 배경 전용 스타일 (움직임 적용됨)
const BackgroundTop = styled(Background)`
  z-index: 1;
  transition: transform 0.3s ease-out;
`;

// 하단 배경 전용 스타일 (고정)
const BackgroundBottom = styled(Background)`
  z-index: 2;
`;

// 콘텐츠 내용 래퍼
const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
`;

// 마스코트 이미지 스타일
const MascortImg = styled.div`
  img {
    width: 332px;
    height: 332px;
    position: absolute;
    bottom: 15%;
    right: 18%;

    @media screen and (max-width: 1440px) {
      width: 300px;
      height: 300px;
      position: absolute;
      bottom: 14%;
      right: 16%;
    }
    @media screen and (max-width: 1300px) {
      width: 290px;
      height: 290px;
      position: absolute;
      bottom: 13%;
      right: 14%;
    }
    @media screen and (max-width: 1200px) {
      width: 280px;
      height: 280px;
      position: absolute;
      bottom: 13%;
      right: 12%;
    }
    @media screen and (max-width: 1100px) {
      width: 270px;
      height: 270px;
      position: absolute;
      bottom: 12%;
      right: 10%;
    }
    @media screen and (max-width: 1024px) {
      width: 260px;
      height: 260px;
      position: absolute;
      bottom: 12%;
      right: 6%;
    }
    @media screen and (max-width: 868px) {
      width: 250px;
      height: 250px;
      position: absolute;
      bottom: 12%;
      right: 2%;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const teamToMascortId = {
  "두산 베어스": "0",
  "한화 이글스": "7",
  "기아 타이거즈": "1",
  "키움 히어로즈": "9",
  "KT 위즈": "4",
  "LG 트윈스": "3",
  "롯데 자이언츠": "6",
  "NC 다이노스": "8",
  "삼성 라이온즈": "2",
  "SSG 랜더스": "5",
};

const Event = () => {
  const { userProfile } = authStore();
  const teamName = userProfile?.favoriteTeam;
  const mascortId = teamToMascortId[teamName] || null;
  const mascortImg = getMascort(mascortId);

  // 스크롤 초기값
  const mascortRef = useRef(null);
  const bottomRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 100;
      const y = (e.clientY / innerHeight - 0.5) * 100;

      if (topRef.current) {
        topRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const mascortTop = mascortRef.current?.getBoundingClientRect().top || 0;
      const windowHeight = window.innerHeight;

      const reachedMascort = mascortTop < windowHeight;

      if (!reachedMascort) {
        const scale = Math.min(1 + scrollY / 2500, 1.2); // 최대 1.2까지 확대
        if (bottomRef.current) {
          bottomRef.current.style.transform = `scale(${scale})`;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <BackgroundBottom ref={bottomRef}>
        <BackgroundImage src={backgroundBottom} alt="back_bottom" />
      </BackgroundBottom>

      <BackgroundTop ref={topRef}>
        <BackgroundImage src={backgroundTop} alt="back_top" />
      </BackgroundTop>

      <ContentWrapper>
        <ContentsTitle />
        <Game />
        <MascortImg ref={mascortRef}>
          {mascortImg ? (
            <img src={mascortImg} alt={`${teamName} 마스코트`} />
          ) : null}
        </MascortImg>
      </ContentWrapper>
    </Container>
  );
};

export default Event;
