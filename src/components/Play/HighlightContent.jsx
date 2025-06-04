import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

// 슬라이드 개별 박스
const SlideBox = styled.div`
  width: 200px;
  height: 300px;
  border: 4px solid var(--gray6);
  border-radius: 1rem;
  background-color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s, opacity 0.3s, bottom 0.3s;

  /* 계단 형식 효과 */
  &.diff-0 {
    z-index: 5;
    transform: translateX(-50%) scale(1);
    opacity: 0.8;
    bottom: 0;
    border-color: var(--main);
  }
  &.diff-1 {
    z-index: 4;
    transform: translateX(-50%) scale(0.9);
    opacity: 0.7;
    bottom: -10px;
  }
  &.diff-2 {
    z-index: 3;
    transform: translateX(-50%) scale(0.8);
    opacity: 0.5;
    bottom: -20px;
  }
  &.diff-3 {
    z-index: 2;
    transform: translateX(-50%) scale(0.7);
    opacity: 0.3;
    bottom: -30px;
  }
  &.diff-more {
    z-index: 1;
    transform: translateX(-50%) scale(0.6);
    opacity: 0;
    bottom: -40px;
  }
`;

// 전체 슬라이더 래퍼
const SliderWrapper = styled.div`
  width: 100%;
  padding: 50px 0;
  overflow: visible;
  position: relative;
`;

const HighlightContent = () => {
  const cards = Array.from({ length: 20 }, (_, i) => i + 1);
  const [activeIndex, setActiveIndex] = useState(3);

  const getDiff = (idx, active, length) => {
    const diff = Math.abs((idx % length) - active);
    return Math.min(diff, length - diff);
  };

  const getClassByDiff = (diff) => {
    if (diff === 0) return "diff-0";
    if (diff === 1) return "diff-1";
    if (diff === 2) return "diff-2";
    if (diff === 3) return "diff-3";
    return "diff-more";
  };

  return (
    <SliderWrapper>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={7}
        centeredSlides={true}
        loop={true}
        spaceBetween={-350} // 겹치기 효과
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex % cards.length);
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            setActiveIndex(swiper.realIndex % cards.length);
          }, 0);
        }}
        style={{
          overflow: "visible",
          paddingLeft: "160px",
          paddingRight: "180px",
          position: "relative",
        }}
      >
        {cards.map((card, idx) => {
          const diff = getDiff(idx, activeIndex, cards.length);
          const className = getClassByDiff(diff);
          return (
            <SwiperSlide
              key={idx}
              style={{
                width: "200px",
                position: "relative",
                height: "300px",
              }}
            >
              <SlideBox className={className}>Card {card}</SlideBox>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderWrapper>
  );
};

export default HighlightContent;
