import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
  min-height: 100vh;
  background: black;
  color: white;
`;

// ProductBanner.jsx와 동일한 스타일
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

const TeamHome = () => {
  const { teamCode } = useParams();
  const currentTeamCode = teamCode || "ds_bas";

  // teamCode를 bannerKey로 변환하는 매핑
  const teamCodeToBannerKey = {
    ssg_lds: "ssg",
    ds_bas: "doosan",
    hw_egs: "hanwha",
    kiwoom: "kiwoom",
    lg_twins: "lg",
    lt_gnt: "lotte",
    nc_dns: "nc",
    ss_lns: "samsung",
    kia_tgs: "kia",
    kt_wiz: "kt",
  };

  const bannerKey = teamCodeToBannerKey[currentTeamCode] || "kbo";

  // bannerLinks 데이터 (bannerLinks.js와 동일)
  const bannerLinks = {
    doosan: { type: "video", src: "/videos/banner_doosan.mp4" },
    hanwha: { type: "video", src: "/videos/banner_hanwha.mov" },
    kiwoom: { type: "video", src: "/videos/banner_kiwoom.mov" },
    lg: { type: "video", src: "/videos/banner_lg.mov" },
    lotte: { type: "video", src: "/videos/banner_lotte.mov" },
    nc: { type: "video", src: "/videos/banner_nc.mov" },
    samsung: { type: "video", src: "/videos/banner_samsung.mov" },
    ssg: { type: "video", src: "/videos/banner_ssg.mov" },
    kt: { type: "image", src: "/api/placeholder/1728/500" },
    kia: { type: "image", src: "/api/placeholder/1728/500" },
    kbo: { type: "video", src: "/videos/banner_kbo.mov" },
  };

  const banner = bannerLinks[bannerKey] || bannerLinks["kbo"];

  return (
    <Container>
      {/* ProductBanner Section - 구단별 영상/이미지 */}
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
          <BannerImg src={banner.src} alt={`${bannerKey} 배너 이미지`} />
        )}
      </BannerBox>

      {/* 추후 추가될 섹션들... */}
    </Container>
  );
};

export default TeamHome;
