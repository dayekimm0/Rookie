import styled from "styled-components";
import ReactPlayer from "react-player";
import headerbg from "/src/images/banners/banner-headerbg.png";
import bannerLinks from "../../data/bannerLinks";

const BannerBox = styled.div`
  position: relative;
  width: 100%;
  height: 440px;

  @media screen and (max-width: 1440px) {
    height: 300px;
  }
  @media screen and (max-width: 1024px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 200px;
  }
`;

const BannerBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const PlayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 3;
`;

const BannerPlayer = styled(ReactPlayer)`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;

  width: 1020px !important;
  height: 440px !important;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1440px) {
    width: 800px !important;
    height: 300px !important;
  }

  @media (max-width: 1024px) {
    width: 1024px !important;
    height: 300px !important;
  }

  @media (max-width: 500px) {
    width: 500px !important;
    height: 200px !important;
  }
`;

const ProductBanner = ({ team = "kbo" }) => {
  const videoUrl = bannerLinks[team] || bannerLinks["kbo"];

  return (
    <BannerBox>
      <BannerBackground src={headerbg} alt="bg" />
      <Overlay />
      <PlayerWrapper>
        <BannerPlayer
          url={videoUrl}
          playing
          loop
          muted
          controls={false}
          width="100%"
          height="100%"
          playsinline
        />
      </PlayerWrapper>
    </BannerBox>
  );
};

export default ProductBanner;
