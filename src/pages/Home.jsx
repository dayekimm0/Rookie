import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import RankingTable from "../components/Home/RankingTable";
import MainSlide from "../components/Home/MainSlide";
import MyhomeMainSlide from "../components/Home/MyhomeMainSlide";
import bannerStrike from "../images/banners/banner-strike.png";
import bannerStrike_m from "../images/banners/bannerStrike_mh.png";
import PlaySlide from "../components/Home/PlaySlide";
import HomeList from "../components/Home/HomeList";
import HighlightSlide from "../components/Home/HighlightSlide";
import PopularPlayer from "../components/Home/PopularPlayer";
import CollaboBanner from "../components/Home/CollaboBanner";
import HomeProducts from "../components/Home/HomeProducts";
import authStore from "../stores/AuthStore";

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

const ProductCardWrap = styled.div`
  margin-top: 120px;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
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

const Banner = styled.div`
  margin-top: 40px;
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
  @media screen and (max-width: 768px) {
    margin-top: 35px;
    img {
      &:nth-of-type(1) {
        display: none;
      }
      &:nth-of-type(2) {
        display: block;
      }
    }
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

const SvgSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  .path {
    stroke: #fff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Home = () => {
  const { isLoading, userProfile } = authStore();

  return (
    <Container>
      {isLoading ? (
        <SlideLoaderWrapper>
          <SvgSpinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            />
          </SvgSpinner>
        </SlideLoaderWrapper>
      ) : userProfile?.favoriteTeam ? (
        // <MyhomeMainSlide isMyhome={userProfile.favoriteTeam} />
        //로그온 셀렉트 수정되면 위에걸로 변경
        <MyhomeMainSlide isMyhome={"두산 베어스"} />
      ) : (
        <MainSlide />
      )}
      <Banner className="inner">
        <img src={bannerStrike} alt="banner" />
        <img src={bannerStrike_m} alt="banner" />
      </Banner>
      <HighlightSlide />
      <PlaySlide />
      <HomeList />
      <RankingTable />
      <PopularPlayer />
      <CollaboBanner />
      <div className="home_products">
        <ProductCardWrap>
          <h3>Season 콜라보</h3>
          <HomeProducts />
        </ProductCardWrap>
        <ProductCardWrap>
          <h3>New 신상품</h3>
          <HomeProducts />
        </ProductCardWrap>
        <ProductCardWrap>
          <h3>Best 인기상품</h3>
          <HomeProducts />
        </ProductCardWrap>
      </div>
    </Container>
  );
};

export default Home;
