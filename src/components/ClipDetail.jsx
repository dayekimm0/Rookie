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
import { fetchClipProducts } from "../utils/fetchClipProducts";

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
`;

const WingCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const Btn = styled.div`
  margin-left: 20px;
`;

const stopScrollPropagation = (e) => e.stopPropagation();

const ClipDetail = memo(({ videoId, videoList = [], onClose }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(
    videoList.findIndex((v) => v.id === videoId)
  );
  const [products, setProducts] = useState([]);
  const playersRef = useRef({});
  const productCache = useRef({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

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

  useEffect(() => {
    const fetchAndSet = async () => {
      const currentVideo = videoList[currentIndex];
      if (!currentVideo?.title || !currentVideo?.id) {
        setProducts([]);
        return;
      }

      const videoKey = currentVideo.id;

      if (productCache.current[videoKey]) {
        setProducts(productCache.current[videoKey]); // 캐시된 데이터 사용
      } else {
        const result = await fetchClipProducts(currentVideo.title);
        productCache.current[videoKey] = result; // 캐싱
        setProducts(result);
      }
    };

    if (currentIndex >= 0 && currentIndex < videoList.length) {
      fetchAndSet();
    }
  }, [currentIndex, videoList]);

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

  if (currentIndex === -1 || !videoId) return null;

  return ReactDOM.createPortal(
    <ModalWrapper onClick={onClose}>
      <Swiper
        direction="vertical"
        spaceBetween={50}
        slidesPerView={1}
        mousewheel
        initialSlide={currentIndex}
        modules={[Mousewheel]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        style={{ width: "100%", height: "100%" }}
      >
        {videoList.map((video, index) => (
          <SwiperSlide key={video.id}>
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
              <WingCon>
                <Btn>
                  <LikeButton videoId={video.id} />
                </Btn>
                <ClipProduct
                  products={products}
                  onProductClick={handleProductClick}
                />
              </WingCon>
            </ModalContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </ModalWrapper>,
    document.body
  );
});

export default ClipDetail;
