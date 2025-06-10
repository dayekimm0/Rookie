import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductBanner from "../components/ProductList/ProductBanner";
import TeamStat from "../components/TeamHome/TeamStat";
import TeamVideoProduct from "../components/TeamHome/TeamVideoProduct";
import ShortsSlide from "../components/Slides/ShortsSlide";
import PlaySlidewithTabs from "../components/Slides/PlaySlidewithTabs";
import { homeSlideTab } from "../data/playTabs";
import UpcomingMatch from "../components/TeamHome/UpcomingMatch";

const Container = styled.div`
  min-height: 100vh;
  color: var(--light);
`;

// ProductBanner와 TeamInfoOverlay를 감싸는 래퍼
const BannerWrapper = styled.div`
  position: relative;
`;

// 신상품/인기상품 임시 공간
const PlaceholderSection = styled.div`
  height: 1400px;
  background: var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light);
  font-size: 24px;
  opacity: 0.5;
`;

const TeamHome = () => {
  const { teamCode } = useParams();

  // teamCode를 bannerKey로 변환하는 매핑 (ProductList.jsx와 동일)
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

  const bannerKey = teamCodeToBannerKey[teamCode] || "kbo";

  return (
    <Container>
      <BannerWrapper>
        {/* ProductBanner 컴포넌트 재활용 */}
        <ProductBanner team={bannerKey} />

        {/* TeamStat에서 팀 정보 오버레이만 표시 */}
        <TeamStat teamCode={teamCode} showOverlayOnly={true} />
      </BannerWrapper>

      {/* TeamStat에서 스탯 테이블만 표시 */}
      <TeamStat teamCode={teamCode} showStatsOnly={true} />

      {/* TEAM STORE 영역 */}
      <TeamVideoProduct
        teamCode={teamCode}
        sectionType="TEAM_STORE"
        title="TEAM STORE"
      />

      {/* 신상품/인기상품 임시 공간 (1400px) */}
      <PlaceholderSection>
        신상품(NEW) / 인기상품(BEST) 영역 (1400px)
      </PlaceholderSection>

      {/* ROOKie 파트너존 영역 */}
      <TeamVideoProduct
        teamCode={teamCode}
        sectionType="ROOKIE_PARTNER"
        title="ROOKie 파트너존"
      />

      {/* 영상 모아보기 */}
      <PlaySlidewithTabs
        teamCode={teamCode}
        allTab={homeSlideTab.allTab}
        tabs={homeSlideTab.tabs}
        title={"영상 모아보기"}
      />

      {/* 경기일정 */}
      <UpcomingMatch teamCode={teamCode} />
      {/* 클립 */}
      <ShortsSlide
        teamCode={teamCode}
        playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
        title={"TEAM CLIP"}
        max={21}
      />
    </Container>
  );
};

export default TeamHome;
