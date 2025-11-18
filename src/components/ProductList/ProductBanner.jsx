import { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import bannerLinks from "../../data/bannerLinks";

const BannerBox = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  z-index: 1;
  transform: translateZ(0);
  will-change: transform;

  @media screen and (max-width: 1440px) {
    height: 400px;
  }
  @media screen and (max-width: 1024px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 200px;
  }
`;

const BannerVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  backface-visibility: hidden;
  display: block;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  backface-visibility: hidden;
  display: block;
`;

const ProductBanner = memo(({ team = "kbo" }) => {
  const banner = bannerLinks[team] || bannerLinks["kbo"];
  const videoRef = useRef(null);

  // 영상 재생 보장
  useEffect(() => {
    if (videoRef.current && banner.type === "video") {
      const video = videoRef.current;

      // 재생 실패 시 재시도
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("비디오 자동재생 실패:", error);
          // 재시도
          setTimeout(() => {
            video.play().catch(() => {});
          }, 100);
        });
      }
    }
  }, [banner.type]);

  if (banner.type === "image") {
    return (
      <BannerBox>
        <BannerImg
          src={banner.src}
          alt={`${team} 배너 이미지`}
          fetchPriority="high"
        />
      </BannerBox>
    );
  }

  return (
    <BannerBox>
      <BannerVideo
        ref={videoRef}
        key={banner.src}
        src={banner.src}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </BannerBox>
  );
});

export default ProductBanner;
