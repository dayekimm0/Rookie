import styled from "styled-components";
import ReactPlayer from "react-player";
import headerbg from "/src/images/banners/banner-headerbg.png";
import bannerLinks from "../../data/bannerLinks";

const BannerBox = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

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
const BannerPlayer = styled(ReactPlayer)`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1440px) {
    width: 100% !important;
    height: 400px !important;
  }

  @media (max-width: 1024px) {
    width: 100% !important;
    height: 300px !important;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    height: 300px !important;
  }
  @media (max-width: 500px) {
    width: 100% !important;
    height: 200px !important;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  @media (max-width: 1440px) {
    width: 100% !important;
    height: 400px !important;
  }
  @media (max-width: 1024px) {
    width: 100% !important;
    height: 300px !important;
  }
  @media (max-width: 768px) {
    width: 100% !important;
    height: 300px !important;
  }

  @media (max-width: 500px) {
    width: 100% !important;
    height: 200px !important;
  }
`;

const ProductBanner = ({ team = "kbo" }) => {
  const banner = bannerLinks[team] || bannerLinks["kbo"];

  return (
    <BannerBox>
      {banner.type === "video" ? (
        <BannerPlayer
          url={banner.src}
          playing
          loop
          muted
          controls={false}
          width="100%"
          height="100%"
          playsinline
        />
      ) : (
        <BannerImg src={banner.src} alt={`${team} 배너 이미지`} />
      )}
    </BannerBox>
  );
};

export default ProductBanner;
