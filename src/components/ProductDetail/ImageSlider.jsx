import React, { useState, useRef } from "react";
import styled from "styled-components";
// Swiper 및 모듈 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  width: 600px;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  position: relative;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// 이미지 확대 컨테이너
const ZoomContainer = styled.div`
  position: absolute;
  top: 0;
  right: -650px; // 컨테이너 우측 위치
  width: 550px;
  height: 600px;
  border: 1px solid #ccc;
  overflow: hidden;
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: white;
  z-index: 10;
`;

const ZoomedImage = styled.div`
  position: absolute;
  width: ${(props) => props.zoomLevel * 100}%;
  height: ${(props) => props.zoomLevel * 100}%;
  background-image: url(${(props) => props.src});
  background-position: ${(props) => props.x}% ${(props) => props.y}%;
  background-repeat: no-repeat;
  background-size: ${(props) => props.zoomLevel * 100}%;
  transform-origin: center;
`;

// 마우스 위치에 따라 이동하는 돋보기 (호버 정사각형)
const HoverSquare = styled.div`
  position: absolute;
  width: 80px; /* 정사각형 크기 */
  height: 80px; /* 정사각형 크기 */
  background-color: rgba(200, 200, 200, 0.3); /* 옅은 회색, 투명도 조정 */
  border: 1px solid rgba(200, 200, 200, 0.7);
  pointer-events: none; /* 마우스 이벤트 무시 */
  transform: translate(-50%, -50%); /* 마우스 커서 중앙에 위치 */
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  z-index: 99;
  display: ${(props) => (props.show ? "block" : "none")};
`;

// Swiper 커스텀 스타일
const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: #333;
    background: rgba(255, 255, 255, 0.7);
    width: 40px;
    height: 40px;
    border-radius: 4px;

    &:after {
      font-size: 20px;
    }
  }

  .swiper-button-disabled {
    display: none;
  }

  /* 확대 기능을 위해 이미지 위에 마우스 오버 시, 커서 변경 */
  .swiper-slide img {
    cursor: crosshair;
  }
`;

const SliderControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#333" : "#ccc")};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
`;

const ImageSlider = ({ images, width = 600, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const swiperRef = useRef(null);

  // 줌 레벨
  const zoomLevel = 1.8;

  // 마우스 이벤트 핸들러
  const handleMouseMove = (e) => {
    // 현재 슬라이드의 이미지 요소 가져오기
    const currentImage = document.querySelector(`.swiper-slide-active img`);

    if (!currentImage) return;
    const { left, top, width, height } = currentImage.getBoundingClientRect();

    // 마우스 위치가 이미지 영역 안에 있는지 확인
    if (
      e.clientX < left ||
      e.clientX > left + width ||
      e.clientY < top ||
      e.clientY > top + height
    ) {
      return; // 이미지 영역 밖이면 무시
    }

    // 마우스 위치를 이미지 내에서의 비율로 계산 (0-100%)
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));

    setMousePosition({ x, y });

    // 마우스의 이미지 내 상대적 위치 (픽셀)
    setCursorPosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <SliderContainer>
      <ImageContainer
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <StyledSwiper
          modules={[Navigation]}
          navigation={true}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <SlideImage src={image} alt={`제품 이미지 ${index + 1}`} />
            </SwiperSlide>
          ))}
        </StyledSwiper>

        {/* 마우스 호버 시 보이는 정사각형 */}
        <HoverSquare
          show={showZoom}
          x={cursorPosition.x}
          y={cursorPosition.y}
        />

        {/* 이미지 확대 컨테이너 */}
        <ZoomContainer show={showZoom}>
          <ZoomedImage
            src={images[currentIndex]}
            x={mousePosition.x}
            y={mousePosition.y}
            zoomLevel={zoomLevel}
          />
        </ZoomContainer>
      </ImageContainer>

      <SliderControls>
        {images.map((_, index) => (
          <SliderDot
            key={index}
            active={index === currentIndex}
            onClick={() => {
              swiperRef.current.slideTo(index);
              setCurrentIndex(index);
            }}
          />
        ))}
      </SliderControls>
    </SliderContainer>
  );
};

export default ImageSlider;
