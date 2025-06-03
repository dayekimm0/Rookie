import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

const SlideBox = styled.div`
  width: 200px;
  height: 300px;
  border: 4px solid #9ca3af;
  border-radius: 1rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s, opacity 0.3s;
  position: relative; /* z-index 적용을 위해 */

  &.diff-0 {
    opacity: 1;
    border-color: #2563eb;
    transform: scale(1);
    z-index: 3;
  }
  &.diff-1 {
    opacity: 0.7;
    transform: scale(0.85);
    z-index: 2;
  }
  &.diff-2 {
    opacity: 0.4;
    transform: scale(0.7);
    z-index: 1;
  }
  &.diff-more {
    opacity: 0;
    transform: scale(0.7);
    z-index: 0;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  padding: 50px 0;
  overflow: visible; /* 슬라이드가 컨테이너 밖으로 나와도 잘리지 않도록 */
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
          paddingLeft: "100px",
          paddingRight: "100px",
        }} /* 좌우 패딩 주어 끝 슬라이드 보이도록 */
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
