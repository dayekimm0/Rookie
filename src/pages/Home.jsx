import { useMemo } from "react";
import { Link } from "react-router-dom";
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
import useAllProductsQuery from "../hook/useAllProductsQuery";

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
  a {
    display: inline-block;
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
  const { isLoading: isUserLoading, userProfile } = authStore();
  const { data: allProducts = [], isLoading: isProductLoading } =
    useAllProductsQuery();

  const { kiaTinypingCollabo, newest, popular } = useMemo(() => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

    // const collabo = shuffled.filter((item) => item.collaboration).slice(0, 4);

    const kiaTinypingCollabo = allProducts
      .filter(
        (item) =>
          item.team === "kia_tgs" &&
          item.collaboration &&
          item.collaboration.includes("티니핑")
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    const usedIds = new Set(kiaTinypingCollabo.map((p) => p.id));

    const newest = shuffled.filter((item) => !usedIds.has(item.id)).slice(0, 4);

    newest.forEach((p) => usedIds.add(p.id));

    const popular = shuffled
      .filter((item) => !usedIds.has(item.id))
      .slice(0, 8);

    return { kiaTinypingCollabo, newest, popular };
  }, [allProducts]);

  return (
    <Container>
      {isUserLoading ? (
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
        <MyhomeMainSlide isMyhome={userProfile.favoriteTeam} />
      ) : (
        <MainSlide />
      )}
      <Banner className="inner">
        <Link to={"/event"}>
          <img src={bannerStrike} alt="banner" />
          <img src={bannerStrike_m} alt="banner" />
        </Link>
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
          {isProductLoading ? (
            "Loading"
          ) : (
            <HomeProducts products={kiaTinypingCollabo} />
          )}
        </ProductCardWrap>
        <ProductCardWrap>
          <h3>New 신상품</h3>
          {isProductLoading ? "Loading" : <HomeProducts products={newest} />}
        </ProductCardWrap>
        <ProductCardWrap>
          <h3>Best 인기상품</h3>
          {isProductLoading ? "Loading" : <HomeProducts products={popular} />}
        </ProductCardWrap>
      </div>
    </Container>
  );
};

export default Home;
