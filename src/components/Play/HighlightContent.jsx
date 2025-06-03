import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

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
  transition: transform 0.3s, opacity 0.3s, top 0.3s;
  position: relative;

  /* 계단 형식 효과 */
  &.diff-0 {
    z-index: 5;
    transform: scale(1);
    opacity: 1;
    bottom: 0;
    border-color: var(--main);
  }
  &.diff-1 {
    z-index: 4;
    transform: scale(0.9);
    opacity: 0.7;
    bottom: -10px; /* 위로 20px 올라감 */
  }
  &.diff-2 {
    z-index: 3;
    transform: scale(0.8);
    opacity: 0.5;
    bottom: -20px; /* 위로 40px 올라감 */
  }
  &.diff-3 {
    z-index: 2;
    transform: scale(0.7);
    opacity: 0.3;
    bottom: -30px; /* 위로 60px 올라감 */
  }
  &.diff-more {
    z-index: 1;
    transform: scale(0.6);
    opacity: 0;
    bottom: -40px; /* 위로 80px 올라감 */
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  padding: 50px 0;
  overflow: visible;
`;

const HighlightContent = () => {
  const cards = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

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
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex % cards.length);
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            setActiveIndex(swiper.realIndex % cards.length);
          }, 0);
        }}
        style={{
          paddingLeft: "160px",
          paddingRight: "180px",
        }}
      >
        {cards.map((card, idx) => {
          const diff = getDiff(idx, activeIndex, cards.length);
          const className = getClassByDiff(diff);
          return (
            <SwiperSlide key={idx}>
              <SlideBox className={className}>Card {card}</SlideBox>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderWrapper>
  );
};

export default HighlightContent;
