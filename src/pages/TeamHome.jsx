import { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductBanner from "../components/ProductList/ProductBanner";
import TeamStat from "../components/TeamHome/TeamStat";
import TeamVideoProduct from "../components/TeamHome/TeamVideoProduct";
import ShortsSlide from "../components/Slides/ShortsSlide";
import PlaySlidewithTabs from "../components/Slides/PlaySlidewithTabs";
import { homeSlideTab, teamSlideTabs } from "../data/playTabs";
import UpcomingMatch from "../components/TeamHome/UpcomingMatch";
import InfluencerZone from "../components/TeamHome/InfluencerZone";
import HomeProducts from "../components/Home/HomeProducts"; // 추가
import useAllProductsQuery from "../hook/useAllProductsQuery"; // 추가
import HomeList from "../components/Home/HomeList";
import influencerData from "../data/influencer_playlist.json";

const Container = styled.div`
  color: var(--light);
`;

// ProductBanner와 TeamInfoOverlay를 감싸는 래퍼
const BannerWrapper = styled.div`
  position: relative;
`;

// 신상품/인기상품
const ProductSection = styled.div`
  background: var(--dark);
  padding: 60px 0;

  @media screen and (max-width: 1024px) {
    padding: 40px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
`;

// Home.jsx와 동일한 스타일 (.home_products)
const TeamProducts = styled.div`
  width: 1240px;
  margin: 0 auto;

  .brandGo {
    svg {
      stroke: var(--light);
    }
  }

  @media screen and (max-width: 1440px) {
    width: 100%;
    padding: 0 5%;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 3%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const ProductCardWrap = styled.div`
  margin-top: 120px;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--light);
  }

  &:first-child {
    margin-top: 0;
  }

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 50px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  }
`;

const TeamHome = () => {
  const { teamCode } = useParams();

  // useAllProductsQuery로 전체 상품 데이터 로드
  const { data: allProducts = [], isLoading: isProductLoading } =
    useAllProductsQuery();

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

  const teamSlideTab = teamSlideTabs[teamCode];

  const bannerKey = teamCodeToBannerKey[teamCode] || "kbo";

  // Home.jsx와 동일한 상품 분류 로직 (팀별 필터링 추가)
  const { newest, popular, teamStoreProducts } = useMemo(() => {
    // 해당 팀의 상품만 필터링
    const teamProducts = teamCode
      ? allProducts.filter((item) => item.team === teamCode)
      : allProducts;

    // 랜덤하게 섞기
    const shuffled = [...teamProducts].sort(() => 0.5 - Math.random());

    // 신상품 4개
    const newest = shuffled.slice(0, 4);

    // 인기상품 8개 (신상품과 겹치지 않게)
    const usedIds = new Set(newest.map((p) => p.id));
    const popular = shuffled
      .filter((item) => !usedIds.has(item.id))
      .slice(0, 4);

    // TEAM STORE용 상품 4개 (신상품, 인기상품과 겹치지 않게)
    popular.forEach((p) => usedIds.add(p.id));
    const teamStoreProducts = shuffled
      .filter((item) => !usedIds.has(item.id))
      .slice(0, 4);

    return { newest, popular, teamStoreProducts };
  }, [allProducts, teamCode]);

  // 인플루언서 존 데이터
  const teamData = influencerData.teams.find((team) => team.team === teamCode);
  const influencers = teamData?.influencers || [];

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

      {/* 영상 모아보기 */}
      <PlaySlidewithTabs
        teamCode={teamCode}
        allTab={teamSlideTab.allTab}
        tabs={teamSlideTab.tabs}
        title={"영상 모아보기"}
      />

      {/* 경기일정 */}
      <UpcomingMatch teamCode={teamCode} />

      {/* 클립 */}
      <ShortsSlide
        teamCode={teamCode}
        playlistId={teamSlideTab.clip.playlistId}
        title={"TEAM CLIP"}
        max={21}
      />

      {/* TEAM STORE 영역 */}
      <TeamVideoProduct
        teamCode={teamCode}
        sectionType="TEAM_STORE"
        title="TEAM STORE"
      />

      {/* New 신상품 / Best 인기상품 섹션 */}
      <ProductSection>
        <TeamProducts>
          <ProductCardWrap>
            <h3>New 신상품</h3>
            {isProductLoading ? (
              <div>Loading...</div>
            ) : (
              <HomeProducts products={newest} />
            )}
          </ProductCardWrap>

          <ProductCardWrap>
            <h3>Best 인기상품</h3>
            {isProductLoading ? (
              <div>Loading...</div>
            ) : (
              <HomeProducts products={popular} />
            )}
          </ProductCardWrap>
        </TeamProducts>
      </ProductSection>

      {/* ROOKie 파트너존 영역 */}
      <TeamVideoProduct
        teamCode={teamCode}
        sectionType="ROOKIE_PARTNER"
        title="ROOKie 파트너존"
      />

      {/* 인플루언서 영역 */}
      {influencers.map((inf, i) => (
        <InfluencerZone key={i} influencer={inf} teamCode={teamCode} />
      ))}
      <HomeList title={"타 구단 바로가기"} />
    </Container>
  );
};

export default TeamHome;
