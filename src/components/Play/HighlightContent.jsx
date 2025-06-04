import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useRef, useCallback } from "react";
import { PlayLeftBtn, PlayRightBtn } from "../Slides/NaviBtnStyles";
import Arrow from "../../images/icons/main_banner_arr.svg";

// 전체 슬라이더 래퍼
const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`;

// 슬라이드 개별 박스
const SlideBox = styled.div`
  max-width: 280px;
  aspect-ratio: 9/16;
  border-radius: 1rem;
  background-color: var(--light);
  font-size: 1.5rem;
  font-weight: bold;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s, opacity 0.3s, bottom 0.3s;

  /* 계단 형식 효과 */
  &.diff-0 {
    z-index: 5;
    transform: translateX(-50%) scale(1);
    bottom: 0;
    border-color: var(--main);
  }
  &.diff-1 {
    z-index: 4;
    transform: translateX(-50%) scale(0.9);
    filter: brightness(70%) blur(0.1rem);
  }
  &.diff-2 {
    z-index: 3;
    transform: translateX(-50%) scale(0.85);
    filter: brightness(50%) blur(0.2rem);
  }
  &.diff-3 {
    z-index: 2;
    transform: translateX(-50%) scale(0.8);
    filter: brightness(30%) blur(0.3rem);
  }
  &.diff-more {
    z-index: 1;
    transform: translateX(-50%) scale(0.75);
    filter: brightness(10%) blur(0.4rem);
    opacity: 0;
  }

  @media screen and (max-width: 1024px) {
    &.diff-3 {
      transform: translateX(-50%) scale(0.75);
      filter: brightness(10%) blur(0.4rem);
      opacity: 0;
    }
  }

  @media screen and (max-width: 500px) {
    &.diff-2 {
      transform: translateX(-50%) scale(0.75);
      filter: brightness(10%) blur(0.4rem);
      opacity: 0;
    }
  }
`;

const HighlightLeftBtn = styled(PlayLeftBtn)`
  top: 50%;
  transform: translateY(-50%);
`;

const HighlightRightBtn = styled(PlayRightBtn)`
  top: 50%;
  transform: translateY(-50%);
`;

const HighlightContent = () => {
  const cards = Array.from({ length: 20 }, (_, i) => i + 1);
  const [activeIndex, setActiveIndex] = useState(3);
  const swiperRef = useRef(null);

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

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  return (
    <SliderWrapper>
      <Swiper
        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
        spaceBetween={-50}
        breakpoints={{
          0: { slidesPerView: 3 },
          520: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => {
            setActiveIndex(swiper.realIndex % cards.length);
          }, 0);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex % cards.length);
        }}
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          height: "100%",
        }}
      >
        {cards.map((card, idx) => {
          const diff = getDiff(idx, activeIndex, cards.length);
          const className = getClassByDiff(diff);
          return (
            <SwiperSlide
              key={idx}
              style={{
                position: "relative",
                maxWidth: "280px",
                aspectRatio: "9/16",
              }}
            >
              <SlideBox className={className}>Card {card}</SlideBox>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <HighlightLeftBtn onClick={handlePrev}>
        <img src={Arrow} alt="prev" />
      </HighlightLeftBtn>
      <HighlightRightBtn onClick={handleNext}>
        <img src={Arrow} alt="next" />
      </HighlightRightBtn>
    </SliderWrapper>
  );
};

export default HighlightContent;
