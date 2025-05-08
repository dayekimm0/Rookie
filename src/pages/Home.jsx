import styled from "styled-components";
import RankingTable from "../components/Home/RankingTable";
import MainSlide from "../components/Home/MainSlide";
import MyhomeMainSlide from "../components/Home/MyhomeMainSlide";
import bannerStrike from "../images/banners/banner-strike.png";
import PlaySlide from "../components/Home/PlaySlide";
import HomeList from "../components/Home/HomeList";
import HighlightSlide from "../components/Home/HighlightSlide";
import PopularPlayer from "../components/Home/PopularPlayer";
import CollaboBanner from "../components/Home/CollaboBanner";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  width: 100%;
  background: var(--bg);
  color: #fff;

  .main_cardList {
    .brandGo {
      svg {
        stroke: var(--light);
      }
    }
  }
`;

const Banner = styled.div`
  margin-top: 40px;
  img {
    width: 100%;
    max-width: 100%;
  }
`;

const Home = () => {
  return (
    <Container>
      <MyhomeMainSlide />
      <MainSlide />
      <Banner className="inner">
        <img src={bannerStrike} alt="banner" />
      </Banner>
      <HighlightSlide />
      <PlaySlide />
      <HomeList />
      <RankingTable />
      <PopularPlayer />
      <CollaboBanner />
      <div className="main_cardList">
        <ProductCard />
      </div>
    </Container>
  );
};

export default Home;
