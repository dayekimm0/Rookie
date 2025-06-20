import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import YouTube from "react-youtube";
import mockupProduct from "../images/mockup/lgtwins_uniform.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";

SwiperCore.use([Mousewheel]);

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 32%;
  height: 79%;
  left: 34%;
  top: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ModalPlay = styled.div`
  width: 450px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;

const ModalProducts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin: 20px;
  gap: 10px;
  h1 {
    width: 100%;
    color: var(--light);
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const ModalProduct = styled.div`
  width: 160px;
`;

const ProductThumbnail = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.4rem;
    color: var(--light);
  }
`;

const ClipDetail = ({ videoId, videoList = [], onClose }) => {
  const initialIndex = videoList.findIndex((v) => v.id === videoId);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!videoId) return null;

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return ReactDOM.createPortal(
    <ModalWrapper onClick={onClose}>
      <Swiper
        direction="vertical"
        spaceBetween={50}
        slidesPerView={1}
        mousewheel={true}
        initialSlide={initialIndex >= 0 ? initialIndex : 0}
        style={{ width: "100%", height: "100%" }}
      >
        {videoList.map((video, index) => (
          <SwiperSlide key={video.id || index}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalPlay>
                <YouTube
                  videoId={video.id}
                  opts={opts}
                  style={{ width: "100%", height: "100%" }}
                />
              </ModalPlay>
              <ModalProducts>
                <h1>추천하는 ROOK</h1>
                {[1, 2].map((_, i) => (
                  <ModalProduct key={i}>
                    <ProductThumbnail>
                      <img src={mockupProduct} alt="mockup" />
                    </ProductThumbnail>
                    <ProductInfo>
                      <p>최고심 콜라보 유니폼(PINK)</p>
                    </ProductInfo>
                  </ModalProduct>
                ))}
              </ModalProducts>
            </ModalContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </ModalWrapper>,
    document.body // 모달을 body 최상단에 렌더링
  );
};

export default ClipDetail;
