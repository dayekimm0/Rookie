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

  @media (max-width: 1200px) {
    width: 520px;
    height: 520px;
  }

  @media (max-width: 1024px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 375px) {
    width: 95%;
    min-height: 350px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// 이미지 플레이스홀더 (이미지가 없을 때)
const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px dashed #ccc;

  &::after {
    content: "상품 이미지";
    color: #888;
    font-size: 18px;
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    &::after {
      font-size: 16px;
    }
  }

  @media (max-width: 375px) {
    &::after {
      font-size: 14px;
    }
  }
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

  @media (max-width: 1200px) {
    right: -600px;
    width: 500px;
    height: 520px;
  }

  @media (max-width: 1024px) {
    display: none; // 모바일에서는 확대 기능 비활성화
  }
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
  width: 100px; /* 정사각형 크기 */
  height: 100px; /* 정사각형 크기 */
  background-color: rgba(200, 200, 200, 0.3); /* 옅은 회색, 투명도 조정 */
  border: 1px solid rgba(200, 200, 200, 0.7);
  pointer-events: none; /* 마우스 이벤트 무시 */
  transform: translate(-50%, -50%); /* 마우스 커서 중앙에 위치 */
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  z-index: 99;
  display: ${(props) => (props.show ? "block" : "none")};

  @media (max-width: 1024px) {
    display: none; // 모바일에서는 호버 기능 비활성화
  }
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
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 100;

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

    @media (max-width: 1024px) {
      cursor: default; // 모바일에서는 기본 커서
    }
  }

  @media (max-width: 375px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 30px;
      height: 30px;

      &:after {
        font-size: 16px;
      }
    }
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

  @media (max-width: 375px) {
    bottom: 15px;
    gap: 8px;
  }
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#333" : "#ccc")};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  @media (max-width: 375px) {
    width: 10px;
    height: 10px;
  }
`;

const ImageSlider = ({ images = [], width = 600, height = 600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const swiperRef = useRef(null);

  // 이미지가 없는 경우 플레이스홀더 표시
  if (!images || images.length === 0) {
    return (
      <SliderContainer>
        <ImageContainer>
          <ImagePlaceholder />
        </ImageContainer>
      </SliderContainer>
    );
  }

  // 줌 레벨
  const zoomLevel = 1.8;

  // 네비게이션 버튼 영역인지 체크하는 함수
  const isNavigationButton = (target) => {
    // 클릭된 요소나 부모 요소 중에 네비게이션 버튼이 있는지 확인
    let element = target;
    while (element) {
      if (
        element.classList?.contains("swiper-button-next") ||
        element.classList?.contains("swiper-button-prev") ||
        element.closest(".swiper-button-next") ||
        element.closest(".swiper-button-prev")
      ) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  };

  // 마우스 이벤트 핸들러
  const handleMouseMove = (e) => {
    // 모바일에서는 확대 기능 비활성화
    if (window.innerWidth <= 1024) return;

    // 네비게이션 버튼 위에 있으면 확대 기능 비활성화
    if (isNavigationButton(e.target)) {
      setShowZoom(false);
      return;
    }

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

    // 이미지 영역에 있고 네비게이션 버튼이 아니라면 확대 기능 활성화
    setShowZoom(true);

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

  // 마우스 엔터 이벤트 핸들러
  const handleMouseEnter = (e) => {
    // 모바일에서는 확대 기능 비활성화
    if (window.innerWidth <= 1024) return;

    // 네비게이션 버튼 위에 있으면 확대 기능 비활성화
    if (!isNavigationButton(e.target)) {
      setShowZoom(true);
    }
  };

  // 마우스 리브 이벤트 핸들러
  const handleMouseLeave = (e) => {
    // 모바일에서는 확대 기능 비활성화
    if (window.innerWidth <= 1024) return;

    // 네비게이션 버튼으로 이동하는 경우가 아니라면 확대 기능 비활성화
    if (!isNavigationButton(e.relatedTarget)) {
      setShowZoom(false);
    }
  };

  return (
    <SliderContainer>
      <ImageContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <StyledSwiper
          modules={[Navigation]}
          navigation={true}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop={images.length > 1} // 이미지가 여러 개일 때만 루프
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <SlideImage
                src={image}
                alt={`제품 이미지 ${index + 1}`}
                onError={(e) => {
                  // 이미지 로드 실패 시 플레이스홀더로 대체
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML =
                    '<div style="width:100%;height:100%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;border:2px dashed #ccc;border-radius:8px;"><span style="color:#888;font-size:16px;">이미지를 불러올 수 없습니다</span></div>';
                }}
              />
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

      {/* 이미지가 여러 개일 때만 컨트롤 표시 */}
      {images.length > 1 && (
        <SliderControls>
          {images.map((_, index) => (
            <SliderDot
              key={index}
              active={index === currentIndex}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(index);
                  setCurrentIndex(index);
                }
              }}
            />
          ))}
        </SliderControls>
      )}
    </SliderContainer>
  );
};

export default ImageSlider;
