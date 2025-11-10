import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RankingTable from "../components/Home/RankingTable";
import MainSlide from "../components/Home/MainSlide";
import MyhomeMainSlide from "../components/Home/MyhomeMainSlide";
import bannerStrike from "../images/banners/banner-strike.png";
import bannerStrike_m from "../images/banners/bannerStrike_mh.png";
import PlaySlidewithTabs from "../components/Slides/PlaySlidewithTabs";
import HomeList from "../components/Home/HomeList";
import ShortsSlide from "../components/Slides/ShortsSlide";
import PopularPlayer from "../components/Home/PopularPlayer";
import CollaboBanner from "../components/Home/CollaboBanner";
import authStore from "../stores/AuthStore";
import { homeSlideTab } from "../data/playTabs";
import Spinner from "../components/Spinner";
import HomeProductSection from "../components/Home/ProductSection";
import HomeProductSkeleton from "../components/Skeleton/HomeProductSkeleton";
import ProductErrorFallback from "../components/Error/ProductErrorFallback";

const Container = styled.div`
  width: 100%;
  background: var(--bg);
  color: var(--light);

  .home_products {
    width: 1240px;
    margin: 0 auto;
    .brandGo {
      svg {
        stroke: var(--light);
      }
    }
  }
  @media screen and (max-width: 1440px) {
    .home_products {
      width: 100%;
      padding: 0 5%;
    }
  }
  @media screen and (max-width: 1024px) {
    .home_products {
      width: 100%;
      padding: 0 3%;
    }
  }
  @media screen and (max-width: 500px) {
    .home_products {
      width: 100%;
      padding: 0 15px;
    }
  }
`;

const Banner = styled.div`
  margin-top: 80px;
  a {
    display: inline-block;
    width: 100%;
  }
  img {
    width: 100%;
    max-width: 100%;
    &:nth-of-type(1) {
      display: block;
    }
    &:nth-of-type(2) {
      display: none;
    }
  }
  @media screen and (max-width: 1024px) {
    margin-top: 60px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 50px;
    img {
      &:nth-of-type(1) {
        display: none;
      }
      &:nth-of-type(2) {
        display: block;
      }
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 40px;
  }
`;

const SlideLoaderWrapper = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
  }
`;

const Home = () => {
  const { isLoading: isUserLoading, userProfile } = authStore();

  return (
    <Container>
      {isUserLoading ? (
        <SlideLoaderWrapper>
          <Spinner />
        </SlideLoaderWrapper>
      ) : userProfile?.favoriteTeam ? (
        <MyhomeMainSlide isMyhome={userProfile.favoriteTeam} />
      ) : (
        <MainSlide />
      )}
      {/* 팀 엠블럼 */}
      <HomeList title={"TEAMHOME"} />
      {/* 이벤트배너 */}
      <Banner className="inner">
        <Link to={"/event"}>
          <img src={bannerStrike} alt="banner" />
          <img src={bannerStrike_m} alt="banner" />
        </Link>
      </Banner>
      {/* 숏츠 슬라이드 */}
      <ShortsSlide
        playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
        title={"HIGHLIGHT"}
        max={21}
      />
      {/* 탭 영상 슬라이드 */}
      <PlaySlidewithTabs
        allTab={homeSlideTab.allTab}
        tabs={homeSlideTab.tabs}
      />
      {/* 랭킹표 */}
      <RankingTable />
      {/* 인기선수 커머스 연결*/}
      <PopularPlayer />
      {/* 커머스 콜라보배너 */}
      <CollaboBanner />
      {/* 커머스 상품 섹션 */}
      <div className="home_products">
        <ErrorBoundary fallback={<ProductErrorFallback />}>
          <Suspense fallback={<HomeProductSkeleton />}>
            <HomeProductSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Container>
  );
};

export default Home;
