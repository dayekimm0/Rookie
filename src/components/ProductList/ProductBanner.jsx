import styled from "styled-components";
import ReactPlayer from "react-player";
import headerbg from "/src/images/banners/banner-headerbg.png";
import React from "react";

const BannerBox = styled.div`
  position: relative;
  height: 440px;

  @media screen and (max-width: 1024px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 300px;
  }

  @media screen and (max-width: 500px) {
  }
`;

const BannerPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1020px !important;
  height: 440px !important;
  video {
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
    height: 300px !important;
  }

  @media screen and (max-width: 500px) {
  }
`;

const ProductBanner = () => {
  return (
    <BannerBox>
      <Banner>
        <img src={headerbg} alt="bg" />
        <BannerPlayer
          url="/videos/banner_kbo.mov"
          playing
          loop
          muted
          controls={false}
        />
      </Banner>
    </BannerBox>
  );
};

export default ProductBanner;
