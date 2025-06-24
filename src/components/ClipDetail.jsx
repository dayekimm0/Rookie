import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import LikeButton from "./PlayDetail/LikeButton";
import { useNavigate } from "react-router-dom";
import ClipPlayer from "./PlayDetail/ClipPlayer";
import ClipProduct from "./PlayDetail/ClipProduct";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 36%;
  height: 79%;
  left: 34%;
  top: 8%;
  display: flex;
  align-items: flex-end;
  position: relative;
  @media screen and (max-width: 1440px) {
    width: 48%;
    left: 28%;
  }
  @media screen and (max-width: 1024px) {
    width: 66%;
    left: 18%;
  }
  @media screen and (max-width: 768px) {
    width: 84%;
    left: 10%;
  }
  @media screen and (max-width: 500px) {
    width: 78%;
    height: 90%;
    top: 6%;
    display: flex;
    flex-direction: column;
    gap: 2%;
  }
  @media screen and (max-width: 375px) {
    width: 76%;
  }
`;

const WingWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
  }
`;

const WingConup = styled.div`
  flex: 1;
`;

const WingCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  @media screen and (max-width: 500px) {
    position: relative;
  }
`;

const Btn = styled.div`
  margin-left: 20px;
  @media screen and (max-width: 500px) {
    position: absolute;
    right: 0;
    top: -20px;
  }
`;

const stopScrollPropagation = (e) => e.stopPropagation();

const ClipDetail = memo(({ videoId, videoList = [], onClose }) => {
  const navigate = useNavigate();
  const playersRef = useRef({});
  const initialIndex = videoList.findIndex((v) => v.id === videoId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    Object.entries(playersRef.current).forEach(([index, player]) => {
      if (parseInt(index, 10) === currentIndex) {
        player.seekTo(0);
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });
  }, [currentIndex]);

  const onPlayerReady = useCallback(
    (index) => (event) => {
      playersRef.current[index] = event.target;
      if (index === currentIndex) {
        event.target.playVideo();
      } else {
        event.target.pauseVideo();
      }
    },
    [currentIndex]
  );

  const handleProductClick = useCallback(
    (product) => {
      navigate(`/store/${product.team}/${product.id}`);
    },
    [navigate]
  );

  if (initialIndex === -1 || !videoId) return null;

  return ReactDOM.createPortal(
    <ModalWrapper onClick={onClose}>
      <Swiper
        direction="vertical"
        spaceBetween={50}
        slidesPerView={1}
        mousewheel
        initialSlide={initialIndex}
        modules={[Mousewheel]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        style={{ width: "100%", height: "100%" }}
      >
        {videoList.map((video, index) => (
          <SwiperSlide key={`${video.id ?? "no-id"}-${index}`}>
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              onWheel={stopScrollPropagation}
              onTouchMove={stopScrollPropagation}
            >
              <ClipPlayer
                videoId={video.id}
                onReady={onPlayerReady(index)}
                isActive={index === currentIndex}
              />
              <WingWrapper>
                <WingConup onClick={onClose} />
                <WingCon>
                  <Btn>
                    <LikeButton videoId={video.id} />
                  </Btn>
                  <ClipProduct
                    products={video.products || []}
                    onProductClick={handleProductClick}
                  />
                </WingCon>
              </WingWrapper>
            </ModalContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </ModalWrapper>,
    document.body
  );
});

export default ClipDetail;
